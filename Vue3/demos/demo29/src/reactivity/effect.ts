// 全局的当前活跃的effect
import { extend } from '../shared/index';
let activeEffect, shouldTrack

// effect 类
export class ReactiveEffect {
    private _fn: any
    onStop?: () => void
    active: boolean = true
    deps: Set<ReactiveEffect>[] = []
    constructor(fn, public scheduler?) {
        this._fn = fn
    }
    run() {
        // 在收集依赖之前判断当前依赖是否被停止
        if (!this.active) {
            // active 为false 说明已经被stop了不需要收集依赖（不需要绑定activeEffect）直接运行fn
            return this._fn()
        }
        // 把活动的 effect 实例绑定到 activeEffect
        activeEffect = this
        // 依赖收集没有被停止应该收集依赖
        shouldTrack = true
        let res = this._fn()
        // 依赖收集发生在 _fn 运行时触发 getter 器。
        activeEffect = null
        // 收集完依赖以后关闭收集依赖开关
        shouldTrack = false
        return res
    }
    // 停止当前effect的依赖自动更新
    stop() {
        if (this.active) {
            clearupEffect(this)
            if (this.onStop) {
                this.onStop()
            }
            //标记依赖被停止
            this.active = false
        }
    }
}

function clearupEffect(effect) {
    effect.deps.forEach(dep => {
        dep.delete(effect)
    })
    effect.deps = []
}

export function effect(fn, options: any = {}) {
    // 实例化fn 并立即执行依赖收集
    const _effect = new ReactiveEffect(fn, options.scheduler)
    extend(_effect, options)
    _effect.run()
    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}
// 全局依赖存储map
const targetMaps = new Map()

// 初始化依赖数据结构以及获取dep
function getDep(target, key) {
    let depMaps = targetMaps.get(target)

    if (!depMaps) {
        depMaps = new Map()
        targetMaps.set(target, depMaps)
    }

    let dep = depMaps.get(key)

    if (!dep) {
        dep = new Set()
        depMaps.set(key, dep)
    }

    return dep
}

export function isTraking() {
    // activeEffect 和 shouldTrack 存在的情况下处于依赖收集的状态
    return activeEffect && shouldTrack
}

// 依赖收集
export function trick(target, key) {
    // 判断是否应该收集依赖
    if (!isTraking()) return
    const dep = getDep(target, key)
    // 将当前活动的回调函数 effect 存储在 reactive 对象对应 key 的 dep 内。
    trickEffects(dep)
    // 反向收集依赖
    activeEffect.deps.push(dep)
}

// 添加 effect 到 dep
export function trickEffects(dep) {
    if (dep.has(activeEffect)) return // 避免重复收集
    dep.add(activeEffect)
}

// 触发依赖
export function trigger(target, key) {
    // 将存储在 reactive 对象对应 key 的所有依赖取出 
    const dep = getDep(target, key)
    // 挨个调用 update 回调函数
    triggerEffects(dep)
}
// 执行 effect
export function triggerEffects(dep) {
    dep.forEach(reactiveEffect => {
        if (reactiveEffect.scheduler) {
            reactiveEffect.scheduler()
        } else {
            reactiveEffect.run()
        }
    });
}

export function stop(runner) {
    runner.effect.stop()
}