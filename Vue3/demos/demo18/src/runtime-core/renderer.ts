import { createComponentInstance, setUpcomponent } from "./component"

export function render(vnode, container) {
    // patch
    patch(vnode, container)
}

function patch(vnode, container) {

    // 判断 vnode 类型

    // 根据不同类型来处理不同的虚拟节点
    processComponent(vnode, container)
}

function processComponent(vnode, container) {
    mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode)
    setUpcomponent(instance)
    setupRenderEffect(instance, container)
    // return instance
}

function setupRenderEffect(instance, container) {
    const subTree = instance.render()
    patch(subTree, container)
}

