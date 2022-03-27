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