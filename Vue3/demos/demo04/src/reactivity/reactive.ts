import { trick, trigger } from "./effect"

export function reactive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            // 依赖收集
            trick(target, key)
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            // 触发依赖
            trigger(target, key)
            return value
        }
    })
}

