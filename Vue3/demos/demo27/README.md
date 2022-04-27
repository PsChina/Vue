# 实现 currentInstance

实现 currentInstance

component.ts
```ts
function setupStatefulComponent(instance) {
    const Component = instance.type
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

    const { setup } = Component
    if (setup) {
        // 在 setup 调用之前设置 instance
        setCurrentInstance(instance)
        const setupResult = setup(shallowReadonly(instance.props),{emit:instance.emit})
        // 调用之后置空
        setCurrentInstance(null)
        handleSetupResult(instance, setupResult)
    }

}

let currentInstance = null

export function getCurrentInstance(){
    return currentInstance
}

function setCurrentInstance(instance){
    currentInstance = instance
}
```

## Run

```bash
yarn install
```

```bash
yarn build --watch
```


