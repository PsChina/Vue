# 实现 computed

1. computed 是一个 getter 器

1. computed 只有在获取值的时候才会执行 lazy

1. computed 会缓存值如果依赖没有被重新 set 那么 getter 不会被重新计算


## Run

```bash
yarn install
```

```bash
yarn test
```

## 具体实现

computed.ts
```ts
import { ReactiveEffect } from "./effect"


class ComputedRefIml {
    private _value: any
    private _dirty: boolean = true
    private _effect: any
    constructor(getter) {
        this._effect = new ReactiveEffect(getter, () => {
            if (!this._dirty) {
                this._dirty = true
            }
        })
    }
    get value() {
        // get
        if (this._dirty) {
            // 执行并且依赖收集
            this._value = this._effect.run()
            this._dirty = false
        }
        return this._value
    }
}

export function computed(getter) {
    return new ComputedRefIml(getter)
}
```
