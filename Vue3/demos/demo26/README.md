# 实现组件 Fragment 和 Text 类型节点

实现组件 Fragment 和 Text 类型节点

renderSlots.ts
```ts
import { createVNode, Fragment } from "../vnode";

export function renderSlots(slots, name, props){
  const slot = slots[name]
  if(slot){
    if( typeof slot ==='function' ){
      return createVNode(Fragment,{},slot(props))
    }
  }
  return {}
}
```

renderer.ts
```ts
import { Fragment, Text } from "../vnode";
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

function processText(vnode:any,container:any){
    const { children } = vnode
    const textNode = (vnode.el = document.createTextNode(children))
    container.append(textNode)
}


// processFragment 只渲染 children
function processFragment(vnode:any,container:any){
    mountChildren(vnode,container)
}
```

vnode.ts
```ts
export const Fragment = Symbol('Fragment')

export const Text = Symbol('Text')

export function createTextVNode(text:string){
    return createVNode(Text,{},text)
}
```

## Run

```bash
yarn install
```

```bash
yarn build --watch
```


