# 实现 shallowReadonly

1. 实现 shallowReadonly 表层只读深层可以设置值



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
import { shallowReadonlyHandles } from './bashHandlers';
export function shallowReadonly(raw) {
    return createActiveObject(raw, shallowReadonlyHandles)
}
```

bashHandlers.ts
```ts
import { extend, isObject } from "../shared"

const shallowReadonlyGet = createGetter(true, true)

function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadonly
        }
        const res = Reflect.get(target, key, receiver)
        if (shallow) {
            return res
        }
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

export const shallowReadonlyHandles = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
})
```


