
# 实现 effect 返回 runner

1. effect 应该返回 runner

1. runner 手动调用后应该正常工作（运行内部依赖并更新）

1. effect返回的 runner 在调用后应该能正常获取返回值

## Run

```bash
yarn install
```

```bash
yarn test
```

## 具体实现

effect.ts
```ts
export function effect(fn) {
    // 实例化fn 并立即执行依赖收集
    const _effect = new ReactiveEffect(fn)
    _effect.run()
    return _effect.run.bind(_effect)
}
```