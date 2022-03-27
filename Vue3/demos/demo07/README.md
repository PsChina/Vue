# 实现 redonly 功能

1. redonly 封装了一个只读的对象

1. redonly 对象不能被 set 用户 set redonly 对象会报错


### 总结

TDD 一共分为三步

1. 编写测试用例

1. 实现

1. 优化

## Run

```bash
yarn install
```

```bash
yarn test
```

## 具体实现

优化过后的代码

reactive.ts 
```ts
import { readonlyHandlers } from './bashHandlers';

export function readonly(obj) {
    return createActiveObject(obj, readonlyHandlers)
}

function createActiveObject(obj: any, bashHandlers) {
    return new Proxy(obj, bashHandlers);
}
```

bashHandlers.ts

```ts
import { trick, trigger } from "./effect"

function createGetter(isReadonly = false) {
    return function (target, key, receiver) {
        // 依赖收集
        if (!isReadonly) {
            trick(target, key)
        }
        return Reflect.get(target, key, receiver)
    }
}

const readonyGet = createGetter(true)

export const readonlyHandlers = {
    get: readonyGet,
    set(target, key, value, receiver) {
        new Error('The read-only object cannot be set')
        console.warn()
        return value
    }
}
```