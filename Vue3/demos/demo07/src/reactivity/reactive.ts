import { mutableHandlers, readonlyHandlers } from './bashHandlers';

export function reactive(obj) {
    return createActiveObject(obj, mutableHandlers)
}

export function readonly(obj) {
    return createActiveObject(obj, readonlyHandlers)
}

function createActiveObject(obj: any, bashHandlers) {
    return new Proxy(obj, bashHandlers);
}
