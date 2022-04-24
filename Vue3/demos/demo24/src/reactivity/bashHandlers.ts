
import { extend, isObject } from "../shared/index"
import { trick, trigger } from "./effect"
import { reactive, readonly, ReactiveFlags } from "./reactive"

const get = createGetter()
const set = createSetter()
const readonyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        const res = Reflect.get(target, key, receiver)
        if (shallow) {
            return res
        }
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


export const mutableHandlers = {
    get,
    set
}

export const readonlyHandlers = {
    get: readonyGet,
    set(target, key, value, receiver) {
        new Error('The read-only object cannot be set')
        console.warn()
        return value
    }
}

export const shallowReadonlyHandles = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
})