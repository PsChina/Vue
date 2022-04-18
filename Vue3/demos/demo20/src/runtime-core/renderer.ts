import { createComponentInstance, setUpcomponent } from "./component"
import { isObject } from '../shared/index'
export function render(vnode, container) {
    // patch
    patch(vnode, container)
}

function patch(vnode, container) {
    // 判断 vnode 类型
    if (typeof vnode.type === 'string') {
        processElement(vnode, container)
    } else if (isObject(vnode.type)) {
        // 根据不同类型来处理不同的虚拟节点
        processComponent(vnode, container)
    }
}

function processComponent(vnode, container) {
    mountComponent(vnode, container)
}

function processElement(vnode, container) {
    mountElement(vnode, container)
}

function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode)
    setUpcomponent(instance)
    setupRenderEffect(instance, vnode, container)
    // return instance
}

function mountElement(vnode, container) {
    const { type, children, props } = vnode
    const el = (vnode.el = document.createElement(type))

    // string
    if (typeof children === 'string') {
        el.textContent = children
    } else if (Array.isArray(children)) {
        mountChildren(vnode, el)
    }

    // props
    for (const key in props) {
        const val = props[key]
        el.setAttribute(key, val)
    }
    container.append(el)
}

function mountChildren(vnode, container) {
    vnode.children.forEach((v) => {
        if (typeof v === 'string') {
            container.append(v)
        } else {
            patch(v, container)
        }
    })
}

function setupRenderEffect(instance, vnode, container) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)
    patch(subTree, container)
    // element -> mount
    vnode.el = subTree.el
}

