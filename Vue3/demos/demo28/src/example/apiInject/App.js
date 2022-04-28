import { h, provide, inject } from "../../../lib/guide-mini-vue.esm.js";
export const App = {
  name: "App",
  render() {
    return h("div", {}, [h("p", {}, "Provide"), h(Consumer)]);
  },
  setup() {
    provide("foo", "fooVal");
    provide("bar", "barVal");
  },
};

const Consumer = {
  name: "Consumer",
  setup() {
    const foo = inject("foo");
    const bar = inject("bar");
    return {
      foo,
      bar,
    };
  },
  render() {
    return h("div", {}, `Consumer: - ${this.foo} - ${this.bar}`);
  },
};
