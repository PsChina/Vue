# 实现 effect 的 stop 功能

1. stop 是 effect 文件抛出的一个可以让 ReactiveEffect 实例停止响应式的工具函数

1. stop接收一个 runner

1. 被 stop 的 runner 会移除所有依赖并停止响应式更新

1. 手动调用被 stop 的 runner 仍然可以正常工作 

## onStop 的实现

1. onStop 是 effect 第二个参数的一个属性

1. onStop 会在 stop 函数处理 runner 后被 effect 实例调用

## Run

```bash
yarn install
```

```bash
yarn test
```

## 具体实现


```ts
// 依赖收集
export function trick(target, key) {
    const dep = getDep(target, key)
    if (activeEffect) {
        // 将当前活动的回调函数 effect 存储在 reactive 对象对应 key 的 dep 内。
        dep.add(activeEffect)
        // effect 反向收集 dep
        activeEffect.deps.push(dep)
    }
}
```

effect.ts  ReactiveEffect
```ts
class ReactiveEffect {
    //...
    active: boolean = true
    deps: Set<ReactiveEffect>[] = []
    //...
    stop() {
        if (this.active) {
            clearupEffect(this)
            this.active = false
        }
    }
}
function clearupEffect(effect) {
    effect.deps.forEach(dep => {
        dep.delete(effect)
    })
    effect.deps = []
}
```


effect.ts  effect
```ts
export function effect(fn, options: any = {}) {
    // 实例化fn 并立即执行依赖收集
    const _effect = new ReactiveEffect(fn, options.scheduler)
    _effect.run()
    const runner: any = _effect.run.bind(_effect)
    // 让 runner 持有 effect
    runner.effect = _effect
    return runner
}
```

effect.ts  stop
```ts
// 抛出 stop
export function stop(runner) {
    runner.effect.stop()
}
```

### onStop


effect.ts effect
```ts
import { extend } from '../shared/index';
export function effect(fn, options: any = {}) {
    // 实例化fn 并立即执行依赖收集
    const _effect = new ReactiveEffect(fn, options.scheduler)
    extend(_effect, options)
    _effect.run()
    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}
```

shared/index.ts

```ts
export const extend = Object.assign
```


effect.ts ReactiveEffect
```ts
class ReactiveEffect {
    onStop?: () => void
    active: boolean = true
    deps: Set<ReactiveEffect>[] = []
    // ...
    stop() {
        if (this.active) {
            clearupEffect(this)
            if (this.onStop) {
                this.onStop()
            }
            this.active = false
        }
    }
}
```

