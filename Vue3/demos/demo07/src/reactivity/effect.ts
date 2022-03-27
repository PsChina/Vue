// 全局的当前活跃的effect
import { extend } from '../shared/index';
let activeEffect

// effect类
class ReactiveEffect {
    private _fn: any
    onStop?: () => void
    active: boolean = true
    deps: Set<ReactiveEffect>[] = []
    constructor(fn, public scheduler) {
        this._fn = fn
    }
    run() {
        // 把活动的 effect 实例绑定到 activeEffect
        activeEffect = this
        let res = this._fn()
        // 依赖收集发生在 _fn 运行时触发 getter 器。
        activeEffect = null
        return res
    }
    stop() {
        if (this.active) {
            clearupEffect(this)
            if (this.onStop) {
                this.onStop()
            }
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
// 依赖收集
export function trick(target, key) {
    const dep = getDep(target, key)
    if (activeEffect) {
        // 将当前活动的回调函数 effect 存储在 reactive 对象对应 key 的 dep 内。
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }
}
// 触发依赖
export function trigger(target, key) {
    // 将存储在 reactive 对象对应 key 的所有依赖取出 
    const dep = getDep(target, key)
    // 挨个调用 update 回调函数
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