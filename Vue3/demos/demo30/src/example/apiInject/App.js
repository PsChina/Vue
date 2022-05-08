import { h, provide, inject } from "../../../lib/guide-mini-vue.esm.js";
export const App = {
  name: "App",
  render() {
    return h("div", {}, [h("p", {}, "Provide"), h(ProviderTwo)]);
  },
  setup() {
    provide("foo", "fooVal");
    provide("bar", "barVal");
  },
};

const ProviderTwo = {
  name: "ProviderTwo",
  setup() {
    provide("foo", "fooTwo");
    const foo = inject("foo");
    return {
      foo,
    };
  },
  render() {
    return h("div", {}, [h("p", {}, `Provider Two ${this.foo}`), h(Consumer)]);
  },
};

const Consumer = {
  name: "Consumer",
  setup() {
    const foo = inject("foo");
    const bar = inject("bar");
    const baz = inject("baz", () => "bazDefault");
    return {
      foo,
      bar,
      baz,
    };
  },
  render() {
    return h("div", {}, `Consumer: - ${this.foo} - ${this.bar} - ${this.baz}`);
  },
};
