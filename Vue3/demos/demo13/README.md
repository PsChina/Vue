# 实现 ref

1. ref 支持封装值类型(非对象类型) 使之变成一个响应式对象

### 初步实现想法

```ts
export function ref(value){
    return reactive({value})
}
```

发现这样实现也行但是考虑到以后没办法拦截 set get。


如果需要做额外的事情的话就必然去修改 reactive 函数的实现。


这样依赖的话其实是一个缺陷，所以还是下面的实现方法更佳。

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
import { hasChanged, isObject } from "../shared"
import { isTraking, trickEffects, triggerEffects } from "./effect"
import { reactive } from "./reactive"


class RefImpl {
    private _rawValue: any
    private _value: any
    public dep
    constructor(value) {
        // 保存原来的值以便用Object.is(hasChanged)比较差异
        this._rawValue = value
        // 值类型和对象类型分别采用不同的方式处理
        this._value = covert(value)
        this.dep = new Set()
    }
    get value() {
        trackRefValue(this)
        return this._value
    }
    set value(newValue) {
        if (hasChanged(this._rawValue, newValue)) {
            this._rawValue = newValue
            this._value = covert(newValue)
            triggerEffects(this.dep)
        }
    }
}
// covert 复用相同的处理方式 新的 value 如果是一个对象那么仍然需要用 reactive 包裹
function covert(value) {
    return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
    if (isTraking()) {
        trickEffects(ref.dep)
    }
}

export function ref(value) {
    return new RefImpl(value)
}
```

effect.ts

抽离 trickEffects 和 triggerEffects 以便逻辑复用
```ts
// 依赖收集
export function trick(target, key) {
    // 判断是否应该收集依赖
    if (!isTraking()) return
    const dep = getDep(target, key)
    // 将当前活动的回调函数 effect 存储在 reactive 对象对应 key 的 dep 内。
    trickEffects(dep)
    // 反向收集依赖
    activeEffect.deps.push(dep)
}

// 添加 effect 到 dep
export function trickEffects(dep) {
    if (dep.has(activeEffect)) return // 避免重复收集
    dep.add(activeEffect)
}

// 触发依赖
export function trigger(target, key) {
    // 将存储在 reactive 对象对应 key 的所有依赖取出 
    const dep = getDep(target, key)
    // 挨个调用 update 回调函数
    triggerEffects(dep)
}
// 执行 effect
export function triggerEffects(dep) {
    dep.forEach(reactiveEffect => {
        if (reactiveEffect.scheduler) {
            reactiveEffect.scheduler()
        } else {
            reactiveEffect.run()
        }
    });
}
```

shared/index.ts

封装 hasChanged 函数增强程序的可读性
```ts
export const hasChanged = (val, newValue) => {
    return !Object.is(val, newValue)
}
```

