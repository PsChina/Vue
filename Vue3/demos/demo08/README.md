# 实现 isReactive 和 isReadonly

1. 实现 isReactive 判断一个对象是不是响应式对象

1. 实现 isReadonly 判断一个对象是不是只读对象


## Run

```bash
yarn install
```

```bash
yarn test
```

## 具体实现


reactive.ts
```ts
export const enum ReactiveFlags {
    IS_REACTIVE = "__v_is_reactive",
    IS_READONLY = '__v_is_readonly'
}

export function isReactive(obj) {
    return !!obj[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(obj) {
    return !!obj[ReactiveFlags.IS_READONLY]
}
```

bashHandlers.ts
```ts
import { ReactiveFlags } from "./reactive"

function createGetter(isReadonly = false) {
    return function (target, key, receiver) {
        // 依赖收集
        if (!isReadonly) {
            trick(target, key)
        }
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        return Reflect.get(target, key, receiver)
    }
}
```

