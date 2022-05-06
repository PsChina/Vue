import { createComponentInstance, setUpcomponent } from "./component"
import { ShapeFlags } from "../shared/ShapeFlags"
import { Fragment, Text } from './vnode';
import { createAppAPI } from "./createApp";


export function createRenderer(options){

    const {createElement,patchProp,insert} = options

    function render(vnode, container, parentComponent) {
        // patch
        patch(vnode, container, parentComponent)
    }



    function patch(vnode, container, parentComponent) {
        const {type, shapeFlag } = vnode
        switch (type) {
            case Fragment:
                processFragment(vnode, container,processFragment)
                break;
            case Text:
                processText(vnode,container)
                break;
            default:
                // 判断 vnode 类型
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(vnode, container,parentComponent)
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    // 根据不同类型来处理不同的虚拟节点
                    processComponent(vnode, container,parentComponent)
                }
                break;
        }
    }

    function processText(vnode:any, container:any){
        const { children } = vnode
        const textNode = (vnode.el = document.createTextNode(children))
        container.append(textNode)
    }

    function processFragment(vnode:any, container:any, parentComponent){
        mountChildren(vnode,container,parentComponent)
    }


    function processComponent(vnode, container, parentComponent) {
        mountComponent(vnode, container, parentComponent)
    }

    function processElement(vnode, container, parentComponent) {
        mountElement(vnode, container, parentComponent)
    }

    function mountComponent(vnode, container, parentComponent) {
        const instance = createComponentInstance(vnode, parentComponent)
        setUpcomponent(instance)
        setupRenderEffect(instance, vnode, container)
        // return instance
    }

    function mountElement(vnode, container, processFragment) {
        const { type, children, shapeFlag, props } = vnode
        const el = (vnode.el = createElement(type))
        // string
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            el.textContent = children
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(vnode, el, processFragment)
        }

        // props
        for (const key in props) {
            const val = props[key]

            patchProp(el,key,val)

        }
        // container.append(el)
        insert(el,container)
    }

    function mountChildren(vnode, container, parentComponent) {
        vnode.children.forEach((v) => {
            patch(v, container, parentComponent) 
        })
    }

    function setupRenderEffect(instance, vnode, container) {
        const { proxy } = instance
        const subTree = instance.render.call(proxy)
        patch(subTree, container, instance)
        // element -> mount
        vnode.el = subTree.el
    }

    return {
        createApp:createAppAPI(render)
    }
}
