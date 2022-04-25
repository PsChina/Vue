const shapeFlags = {
    element: 0,
    stateful_component: 0,
    text_children: 0,
    array_children: 0
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


