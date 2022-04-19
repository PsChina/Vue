# 实现shapeFlags

shapeFlags 描述了虚拟节点的类型，但是又和类型不太一样。

vnode 的 flag `STATEFUL_COMPONENT` 、 `text_chidren` 、 `array_children`

```ts
export const enum ShapeFlage {
    ELEMENT = 1, // 0001
    STATEFUL_COMPONENT = 1 << 1, // 0010
    TEXT_CHILDREN = 1 << 2, // 0100
    ARRAY_CHILDREN = 1 << 3 // 1000
}

// vnode -> stateful_component
// 1. 可以设置 修改
// ShapeFlags.stateful_component = 1
// ShapeFlags.array_children = 1

// 2. 查找
// if(shapeFlags.element)
// if(shapeFlags.stateful_component)

// 对象的方式不够高效 位运算 更高效

// 0000 
// 0001 -> element
// 0010 -> stateful
// 0100 -> text_children
// 1000 -> array_children

// 1010

// 通过 | 运算设置
// 通过 & 运算查找
```

新增 vscode 快捷键

Transform to Uppercase

command + shift + u 

Transform to Lowercase

command + shift + l

## Run

```bash
yarn install
```

```bash
yarn build --watch
```


