import { ref, h } from "../../../lib/guide-mini-vue.esm.js";

// 左侧对比
// const prevChildren  = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
// ];

// const nextChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "E" }, "E"),
// ];

//右侧对比;
// const prevChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
// ];

// const nextChildren = [
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "E" }, "E"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
// ];

// //新的比老的多;
// const prevChildren = [h("div", { key: "A" }, "A"), h("div", { key: "B" }, "B")];

// const nextChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
// ];

//新的比老的多;
// const prevChildren = [h("div", { key: "A" }, "A"), h("div", { key: "B" }, "B")];

// const nextChildren = [
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "D" }, "D"),
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
// ];

// 老的比新的多

// const prevChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "D" }, "D"),
// ];

// const nextChildren = [h("div", { key: "C" }, "C"), h("div", { key: "D" }, "D")];

// 老的比新的多

// const prevChildren = [
//   h("div", { key: "A" }, "A"),
//   h("div", { key: "B" }, "B"),
//   h("div", { key: "C" }, "C"),
//   h("div", { key: "D" }, "D"),
// ];

// const nextChildren = [h("div", { key: "A" }, "A"), h("div", { key: "B" }, "B")];

// 中间对比

const prevChildren = [
  h("div", { key: "A" }, "A"),
  h("div", { key: "B" }, "B"),
  h("div", { key: "C", id: "prev-c" }, "C"),
  h("div", { key: "G" }, "G"),
  h("div", { key: "K" }, "K"),
  h("div", { key: "L" }, "L"),
  h("div", { key: "E" }, "E"),
  h("div", { key: "F" }, "F"),
];

const nextChildren = [
  h("div", { key: "A" }, "A"),
  h("div", { key: "B" }, "B"),
  h("div", { key: "G" }, "G"),
  h("div", { key: "C", id: "next-c" }, "C"),
  h("div", { key: "E" }, "E"),
  h("div", { key: "F" }, "F"),
];

export default {
  name: "ArrayToArray",
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
