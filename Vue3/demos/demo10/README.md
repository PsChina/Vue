# 实现 reactive 和 readonly 嵌套对象转换功能

1. 实现 reactive 深层响应式

1. 实现 readonly 深层响应式


## Run

```bash
yarn install
```

```bash
yarn test
```

## 具体实现

bashHandlers.ts
```ts
import { isObject } from "../shared"
import { trick, trigger } from "./effect"
import { reactive, readonly, ReactiveFlags } from "./reactive"
function createGetter(isReadonly = false) {
    return function get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        const res = Reflect.get(target, key, receiver)
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res)
        }
        // 依赖收集
        if (!isReadonly) {
            trick(target, key)
        }
        return res
    }
}
```


shared/index.ts
```ts
export function isObject(val) {
    return val !== null && typeof val === 'object'
}
```


