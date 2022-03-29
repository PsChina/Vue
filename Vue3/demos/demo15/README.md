# 实现 proxyRefs

1. 被 proxyRefs 包裹的对象获取属性时会自动解包

1. 设置属性时不需要通过读取 .value 设置属性直接设置属性即可


## Run

```bash
yarn install
```

```bash
yarn test
```

## 具体实现

ref.ts
```ts
export function proxyRefs(ref) {
    return new Proxy(ref, {
        get(target, key) {
            return unRef(Reflect.get(target, key))
        },
        set(target, key, value) {
            if (isRef(target[key]) && !isRef(value)) {
                return target[key].value = value
            } else {
                return Reflect.set(target, key, value)
            }
        }
    })
}
```
