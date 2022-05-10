import { ref, h } from "../../../lib/guide-mini-vue.esm.js";
const nextChildren = [h("div", {}, "C"), h("div", {}, "B"), h("div", {}, "A")];
const prevChildren = "text";

export default {
  name: "ArrayToText",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;
    return {
      isChange,
    };
  },
  render() {
    const self = this;
    return self.isChange === true
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren);
  },
};
