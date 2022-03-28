import { mutableHandlers, readonlyHandlers } from './bashHandlers';

export const enum ReactiveFlags {
    IS_REACTIVE = "__v_is_reactive",
    IS_READONLY = '__v_is_readonly'
}

export function reactive(obj) {
    return createActiveObject(obj, mutableHandlers)
}

export function readonly(obj) {
    return createActiveObject(obj, readonlyHandlers)
}

function createActiveObject(obj: any, bashHandlers) {
    return new Proxy(obj, bashHandlers);
}

export function isReactive(obj) {
    return !!obj[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(obj) {
    return !!obj[ReactiveFlags.IS_READONLY]
}