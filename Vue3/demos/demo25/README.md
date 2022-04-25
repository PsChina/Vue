# 实现组件slots功能

实现组件slots功能


数组表示的 slots 不能渲染指定位置

```ts
export const App = {
  name: "App",
  render() {
    const app = h("div", {}, "App");
    const foo = h(Foo, {}, [h("p", {}, "123"), h("p", {}, "456")]);
    return h("div", {}, [app, foo]);
  },
  setup() {
    return {
      msg: "mini-vue shapFlag",
    };
  },
};

```

## Run

```bash
yarn install
```

```bash
yarn build --watch
```


