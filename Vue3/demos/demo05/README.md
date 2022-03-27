# 实现 effect 的 scheduler 功能

1. scheduler 是 effect 的第二个参数给定的 scheduler 属性存储的是一个 function
1. effect 第一次运行的时候会执行 fn 
1. 当响应式对象触发 set update 不会执行 fn 而是执行 scheduler (__当 scheduler 存在的情况下__)
1. 手动执行 runner 的时候仍旧会执行 fn

## Run

```bash
yarn install
```

```bash
yarn test
```


## 具体实现

effect.ts effect
```ts
export function effect(fn, options: any = {}) {
    // 实例化fn 并立即执行依赖收集
    const _effect = new ReactiveEffect(fn, options.scheduler)
    _effect.run()
    return _effect.run.bind(_effect)
}

```


effect.ts trigger
```ts
export function trigger(target, key) {
    // 将存储在 reactive 对象对应 key 的所有依赖取出 
    const dep = getDep(target, key)
    // 挨个调用 update 回调函数
    dep.forEach(reactiveEffect => {
        if (reactiveEffect.scheduler) {
            reactiveEffect.scheduler()
        } else {
            reactiveEffect.run()
        }
    });
}
```

effect.ts ReactiveEffect
```ts
class ReactiveEffect {
    private _fn: any
    constructor(fn, public scheduler) {
        this._fn = fn
    }
    //...
}
```