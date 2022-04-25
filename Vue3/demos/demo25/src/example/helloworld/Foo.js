import { h } from "../../../lib/guide-mini-vue.esm.js";
export const Foo = {
  setup(props) {
    console.log(props);
  },
  render() {
    console.log("this=>", this);
    return h("div", {}, "foo:" + this.count);
  },
};
