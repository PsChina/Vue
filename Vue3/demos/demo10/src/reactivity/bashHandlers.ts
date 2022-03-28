
import { isObject } from "../shared"
import { trick, trigger } from "./effect"
import { reactive, readonly, ReactiveFlags } from "./reactive"


function createGetter(isReadonly = false) {
    return function get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        const res = Reflect.get(target, key, receiver)
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res)
        }
        // 依赖收集
        if (!isReadonly) {
            trick(target, key)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        Reflect.set(target, key, value, receiver)
        // 触发依赖
        trigger(target, key)
        return value
    }
}

const get = createGetter()
const set = createSetter()

export const mutableHandlers = {
    get,
    set
}

const readonyGet = createGetter(true)

export const readonlyHandlers = {
    get: readonyGet,
    set(target, key, value, receiver) {
        new Error('The read-only object cannot be set')
        console.warn()
        return value
    }
}
