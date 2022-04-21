import { h } from "../../../lib/guide-mini-vue.esm.js";
import { Foo } from "./Foo.js";
export const App = {
  render() {
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      [
        "hi",
        h(
          "div",
          {
            class: "red",
            onClick() {
              console.log("hello", this.msg);
            },
            onMousedown() {
              console.log("onMousedown");
            },
          },
          [this.msg, h(Foo, { count: 1 })]
        ),
      ]
    );
  },
  setup() {
    return {
      msg: "mini-vue shapFlag",
    };
  },
};
