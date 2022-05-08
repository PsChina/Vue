import { isObject } from '../shared/index';
import { mutableHandlers, readonlyHandlers, shallowReadonlyHandles } from './bashHandlers';

export const enum ReactiveFlags {
    IS_REACTIVE = "__v_is_reactive",
    IS_READONLY = '__v_is_readonly'
}

export function reactive(raw) {
    return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
    return createActiveObject(raw, readonlyHandlers)
}

export function shallowReadonly(raw) {
    return createActiveObject(raw, shallowReadonlyHandles)
}

export function createActiveObject(target: any, bashHandlers) {
    if(!isObject(target)){
        console.warn(`target ${target} 必须是一个对象`)
        return target
    }
    return new Proxy(target, bashHandlers);
}

export function isReactive(value) {
    return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
    return !!value[ReactiveFlags.IS_READONLY]
}

export function isProxy(value) {
    return isReactive(value) || isReadonly(value)
}