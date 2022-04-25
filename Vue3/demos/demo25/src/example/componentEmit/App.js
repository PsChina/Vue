import { h } from "../../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";
export const App = {
  name: "App",
  render() {
    return h("div", {}, [
      h("div", {}, "App"),
      h(Foo, {
        onAdd(a, b) {
          console.log("on Add", a, b);
        },
        onAddFoo() {
          console.log("onAddFoo");
        },
      }),
    ]);
  },
  setup() {
    return {
      msg: "mini-vue shapFlag",
    };
  },
};
