import { createComponentInstance, setUpcomponent } from "./component"

export function render(vnode, container) {
    // patch
    patch(vnode, container)
}

function patch(vnode, container) {
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

