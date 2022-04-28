# 实现依赖注入功能(provide/inject)

apiInject.ts
```ts
import { getCurrentInstance } from './component';

export function provide(key,value){
 // 存
 const currentInstance:any = getCurrentInstance()

 if(currentInstance){
  let { provides }  = currentInstance
  const parentProvides = currentInstance?.parent?.provides
  if(provides === parentProvides){
    provides = currentInstance.provides = Object.create(parentProvides?parentProvides:null)
  }
  provides[key] = value
 }
 
}

export function inject(key, defaultValue){ // 获取祖先组件的 provides 里面 key 对应的 value
  // 取
  const currentInstance:any = getCurrentInstance()
 
  const provides = currentInstance?.parent?.provides

  if(provides){
      if(key in provides){
        return provides[key]
      } else if(defaultValue){
        if(typeof defaultValue === 'function'){
          return defaultValue()
        }
        return defaultValue
      }
     
  }

}
```


component.ts
```ts
export function createComponentInstance(vnode, parent) {
    const component = {
        vnode,
        type: vnode.type,
        setupState:{},
        props:{},
        slots:{},
        provides:parent ? parent.provides : {},
        parent,
        emit:()=>{},
    }
    component.emit = emit.bind(null,component) as any
    return component
}
```

renderer.ts
```ts
// 疯狂给各种 函数增加 parentComponent 参数
function patch(vnode, container, parentComponent) {

}

// 函数父组件传入入口

function setupRenderEffect(instance, vnode, container) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)
    // 关键参数传入点 instance => parentComponent
    patch(subTree, container, instance)
    // element -> mount
    vnode.el = subTree.el
}


```

## Run

```bash
yarn install
```

```bash
yarn build --watch
```


