

import { createVNode } from './vnode'
import { render } from './renderer'
export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            //  先把组件转换为虚拟节点
            const vnode = createVNode(rootComponent)

            render(vnode, rootContainer)
        }
    }
}

