export { createTextVNode } from './vnode'
import { createVNode } from './vnode'
export function h(type, props?, children?) {
    return createVNode(type, props, children)
}
