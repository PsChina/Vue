# 实现 isRef 和 unRef

1. isRef 用于判断一个对象是否是 Ref 对象

1. unRef 用于将 Ref 对象解包（不需要使用.value属性获取值）


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
class RefImpl {
    // ...
    public __v_isRef = true
    // ...
}
export function isRef(ref) {
    return !!ref.__v_isRef
}

export function unRef(ref) {
    return isRef(ref) ? ref.value : ref
}
```
