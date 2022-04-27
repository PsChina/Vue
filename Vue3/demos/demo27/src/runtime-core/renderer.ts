import { createComponentInstance, setUpcomponent } from "./component"
import { ShapeFlags } from "../shared/ShapeFlags"
import { Fragment, Text } from './vnode';

export function render(vnode, container) {
    // patch
    patch(vnode, container)
}

function patch(vnode, container) {
    const {type, shapeFlag } = vnode
    switch (type) {
        case Fragment:
            processFragment(vnode, container)
            break;
        case Text:
            processText(vnode,container)
            break;
        default:
            // 判断 vnode 类型
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container)
            } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                // 根据不同类型来处理不同的虚拟节点
                processComponent(vnode, container)
            }
            break;
    }
}

function processText(vnode:any, container:any){
    const { children } = vnode
    const textNode = (vnode.el = document.createTextNode(children))
    container.append(textNode)
}

function processFragment(vnode:any, container:any){
    mountChildren(vnode,container)
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
    const { type, children, shapeFlag, props } = vnode
    const el = (vnode.el = document.createElement(type))
    // string
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(vnode, el)
    }

    // props
    for (const key in props) {
        const val = props[key]
        const isOn = (key: string) => /^on[A-Z]/.test(key)
        if (isOn(key)) {
            const event = key.slice(2).toLowerCase()
            el.addEventListener(event, val)
        } else {
            el.setAttribute(key, val)
        }

    }
    container.append(el)
}

function mountChildren(vnode, container) {
    vnode.children.forEach((v) => {
        patch(v, container) 
    })
}

function setupRenderEffect(instance, vnode, container) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)
    patch(subTree, container)
    // element -> mount
    vnode.el = subTree.el
}

