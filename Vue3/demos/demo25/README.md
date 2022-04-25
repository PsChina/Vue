# 实现组件slots功能

实现组件slots功能


数组表示的 slots 不能快速获取到要渲染的元素

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

使用数组来表示的slots能快速精确的获取元素

App.js
```js
export const App = {
  name: "App",
  render() {
    const app = h("div", {}, "App");
    const foo = h(
      Foo,
      {},
      { header: h("p", {}, "header"), footer: h("p", {}, "footer") }
    );
    return h("div", {}, [app, foo]);
  },
  setup() {
    return {
      msg: "mini-vue shapFlag",
    };
  },
};
```

Foo.js
```js
export const Foo = {
  setup() {
    return {};
  },
  render() {
    const foo = h("p", {}, "foo");
    return h("div", {}, [
      renderSlots(this.$slots, "header"),
      foo,
      renderSlots(this.$slots, "footer"),
    ]);
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


