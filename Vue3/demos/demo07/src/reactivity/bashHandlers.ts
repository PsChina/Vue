import { trick, trigger } from "./effect"

function createGetter(isReadonly = false) {
    return function (target, key, receiver) {
        // 依赖收集
        if (!isReadonly) {
            trick(target, key)
        }
        return Reflect.get(target, key, receiver)
    }
}

function createSetter() {
    return function (target, key, value, receiver) {
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