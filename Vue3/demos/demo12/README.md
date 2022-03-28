# 实现 isProxy

1. isProxy 用于判断一个对象是不是使用 Proxy 封装代理 


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
export function isProxy(value) {
    return isReactive(value) || isReadonly(value)
}
```


