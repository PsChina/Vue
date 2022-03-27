// 全局的当前活跃的effect
let activeEffect

// effect类
class ReactiveEffect {
    private _fn: any
    constructor(fn) {
        this._fn = fn
    }
    run() {
        // 把活动的 effect 实例绑定到 activeEffect
        activeEffect = this
        const res = this._fn()
        // 依赖收集发生在 _fn 运行时触发 getter 器。
        activeEffect = null
        return res
    }
}

export function effect(fn) {
    // 实例化fn 并立即执行依赖收集
    const _effect = new ReactiveEffect(fn)
    _effect.run()
    return _effect.run.bind(_effect)
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
    }
}
// 触发依赖
export function trigger(target, key) {
    // 将存储在 reactive 对象对应 key 的所有依赖取出 
    const dep = getDep(target, key)
    // 挨个调用 update 回调函数
    dep.forEach(reactiveEffect => {
        reactiveEffect.run()
    });
}