import { createComponentInstance, setUpcomponent } from "./component"
import { ShapeFlags } from "../shared/ShapeFlags"
import { Fragment, Text } from './vnode';
import { createAppAPI } from "./createApp";
import { effect } from "../reactivity/effect";
import { EMPTY_OBJ } from '../shared'

export function createRenderer(options){

    const {createElement: hostCreateElement,
        patchProp: hostPatchProp,
        insert: hostInsert,
        remove: hostRemove,
        setElementText:hostSetElementText
    } = options
    function render(vnode, container) {
        // patch
        patch(null, vnode, container, null, null)
    }


    // n1 代表老虚拟dom n2 代表新的虚拟节点 n1 不存在就是初始化
    function patch(n1,n2, container, parentComponent, anchor) {
        const {type, shapeFlag } = n2
        switch (type) {
            case Fragment:
                processFragment(n1, n2, container, processFragment, anchor)
                break;
            case Text:
                processText(n1,n2,container)
                break;
            default:
                // 判断 vnode 类型
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(n1,n2, container,parentComponent, anchor)
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    // 根据不同类型来处理不同的虚拟节点
                    processComponent(n1,n2, container,parentComponent, anchor)
                }
                break;
        }
    }

    function processText(n1,n2:any, container:any){
        const { children } = n2
        const textNode = (n2.el = document.createTextNode(children))
        container.append(textNode)
    }

    function processFragment(n1,n2:any, container:any, parentComponent, anchor){
        mountChildren(n2.children,container,parentComponent, anchor)
    }


    function processComponent(n1,n2, container, parentComponent, anchor) {
        mountComponent(n2, container, parentComponent, anchor)
    }

    function processElement(n1,n2, container, parentComponent, anchor) {
        if(!n1){
            mountElement(n2, container, parentComponent, anchor)
        }else{
            patchElement(n1,n2,container, parentComponent, anchor)
        }
        
    }

    function patchElement(n1,n2,container, parentComponent,anchor){
        const oldProps = n1.props || EMPTY_OBJ
        const newProps = n2.props || EMPTY_OBJ
        const el = (n2.el = n1.el)
        patchProps(el, oldProps, newProps)
        patchChildren(n1,n2,el, parentComponent,anchor)

    }

    function patchChildren(n1,n2, container, parentComponent,anchor){ // n1 老节点 n2 新节点
        const prevShapeFlag = n1.shapeFlag
        const c1 = n1.children
        const { shapeFlag } = n2
        const c2 = n2.children
        if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
            if(prevShapeFlag & ShapeFlags.ARRAY_CHILDREN){ // 老节点是Array就清空
                // 删除子节点
                unmountChildren(n1.children)
            }
            if(c1!==c2){ // 清空过后的老节点或者是文本节点
                // 设置text
                hostSetElementText(container,c2)
            }   
        } else { // 新节点是数组
            if(prevShapeFlag & ShapeFlags.TEXT_CHILDREN){ // 老节点是文本节点
                hostSetElementText(container,'')
                mountChildren(c2,container,parentComponent, anchor) // 挂载新节点
            } else { // 新老节点都是数组
                patchKeyedChildren(c1,c2, container, parentComponent, anchor)
            }
        }
        
    }

    function patchKeyedChildren(c1,c2,container,parentComponent,parentAnchor){
        let i = 0
        const l2 = c2.length
        let e1 = c1.length - 1
        let e2 = l2 - 1

        function isSomeVNodeType(n1,n2){
            return n1.type === n2.type && n1.key === n2.key
        }
        // 左侧
        while(i <= e1 && i<= e2){
            const n1 = c1[i]
            const n2 = c2[i]
            if(isSomeVNodeType(n1,n2)){
                patch(n1,n2,container,parentComponent,parentAnchor)
            } else {
                break
            }
            i++
        }
        // 右侧
        while(i <= e1 && i <= e2){
            const n1 = c1[e1]
            const n2 = c2[e2]
            if(isSomeVNodeType(n1,n2)){
                patch(n1,n2,container,parentComponent,parentAnchor)
            } else {
                break
            }
            e1--
            e2--
        }

        // 新的比老的多
        if(i > e1){ 
            // 当出现 i 大于 e1 的时候
            // 有可能是 i 增加 e1 减小 也就是 元素新增在右边
            // 也有可能是 i 不增加即等于0 但是 e1 减小到为负数 元素增加在左边
            if(i <= e2){
                const nextPos = e2 + 1
                let anchor = nextPos < l2 ? c2[nextPos].el : null
                while(i<=e2){
                    patch(null, c2[i], container, parentComponent, anchor)
                    i++
                }
               
            }
        } else if(i > e2){ // 老的比新的多
            while(i <= e1){
                hostRemove(c1[i].el)
                i++
            }
        } else { // 中间对比
            let s1 = i
            let s2 = i
            const toBePatched = e2 - s2 + 1
            let patched = 0
            const keyToNewIndexMap = new Map()
            const newIndexToOldIndexMap = new Array(toBePatched).fill(0)
            let moved = false,
                maxNewIndexSoFar = 0


            for(let i = s2; i <= e2; i++){
                const nextChild = c2[i]
                keyToNewIndexMap.set(nextChild.key, i)
                
            }

            for(let i = s1; i <= e1; i++){
                const prevChild = c1[i]
                if(patched >= toBePatched){
                    hostRemove(prevChild.el)
                    continue
                }
                let newIndex
                if(prevChild.key){
                    newIndex = keyToNewIndexMap.get(prevChild.key)
                } else {
                    for(let j = s2; j <= e2; j++){
                        if(isSomeVNodeType(prevChild, c2[j])){
                            newIndex = j
                            break
                        }
                    }
                }
                if(newIndex === undefined){ // 老节点在新节点里面不存在
                    hostRemove(prevChild.el)
                } else { // 老节点在新节点里面存在故是更新逻辑，不需要锚点
                    if(newIndex >= maxNewIndexSoFar){
                        maxNewIndexSoFar = newIndex
                    } else {
                        moved = true
                    }
                    newIndexToOldIndexMap[newIndex - s2] = i + 1
                    patch(prevChild, c2[newIndex],container,parentComponent,null)
                    patched++
                }
            }

            const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : []

            let j = increasingNewIndexSequence.length - 1

            for(let i = toBePatched - 1; i >= 0; i--){
                const nextIndex = i + s2
                const nextChild = c2[nextIndex]
                const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : null

                if(newIndexToOldIndexMap[i] === 0){
                    // 新增节点
                    patch(null, nextChild, container, parentComponent, anchor)
                } else  if(moved){
                    if(j < 0|| i !== increasingNewIndexSequence[j]){
                        hostInsert(nextChild.el, container, anchor)
                    } else {
                        j--
                    }
                }
            }


        }


    }

    function patchProps(el,oldProps,newProps){
        if(oldProps!==newProps){
            for(const key in newProps){
                const prevProp = oldProps[key]
                const nextProp = newProps[key]
                if(prevProp !== nextProp){
                    hostPatchProp(el, key, prevProp, nextProp)
                }
            }
            if(oldProps !== EMPTY_OBJ){
                for(const key in oldProps){
                    if(!(key in newProps)){
                        hostPatchProp(el, key, oldProps[key], null)
                    }
                }
            }
        }
    }

    function unmountChildren(children){
        for(let i = 0; i<children.length; i++){
            const el = children[i].el
            // remove
            hostRemove(el)
        }
    }

    function mountComponent(vnode, container, parentComponent, anchor) {
        const instance = createComponentInstance(vnode, parentComponent)
        setUpcomponent(instance)
        setupRenderEffect(instance, vnode, container, anchor)
        // return instance
    }

    function mountElement(vnode, container, processFragment, anchor) {
        const { type, children, shapeFlag, props } = vnode
        const el = (vnode.el = hostCreateElement(type))
        // string
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            el.textContent = children
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(vnode.children, el, processFragment, anchor) 
        }

        // props
        for (const key in props) {
            const val = props[key]

            hostPatchProp(el,key,null,val)

        }
        // container.append(el)
        hostInsert(el,container,anchor)
    }

    function mountChildren(children, container, parentComponent, anchor) {
        children.forEach((v) => {
            patch(null,v, container, parentComponent, anchor) 
        })
    }

    function setupRenderEffect(instance, vnode, container, anchor) {
        effect(()=>{
            if(!instance.isMounted){
                //init
                const { proxy } = instance
                const subTree = (instance.subTree = instance.render.call(proxy))
                patch(null,subTree, container, instance, anchor)
                // element -> mount
                vnode.el = subTree.el
                instance.isMounted = true
            } else {
                // update
                const { proxy } = instance
                const subTree = instance.render.call(proxy)
                const prevSubTree = instance.subTree
                instance.subTree = subTree
                patch(prevSubTree,subTree, container, instance, anchor)
            }
        })

    }

    return {
        createApp:createAppAPI(render)
    }
}


function getSequence(arr){
    const p = arr.slice()
    const result = [0]
    let i, j, u, v, c
    const len = arr.length
    for(i = 0;i < len; i++){
      const arrI = arr[i]
      if(arrI !== 0){
        j = result[result.length - 1]
        if(arr[j] < arr[i]){
          p[i] = j
          result.push(i)
          continue
        }
        u = 0
        v = result.length - 1
        while(u < v){
          c = (u + v) >> 1
          if(arr[result[c]] < arrI){
            u = c + 1
          } else {
            v = c
          }
        }
        if(arrI < arr[result[u]]){
          if(u > 0){
            p[i] = result[u - 1]
          }
          result[u] = 1
        }
      }
    }
    u = result.length
    v = result[u - 1]
    while(u-- > 0){
      result[u] = v
      v = p[v]
    }
    return result
  }