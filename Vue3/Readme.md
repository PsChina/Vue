# Vue3 源码解析学习

这个文件夹作为一个笔记本记录PsChina的Vue3源码学习笔记。

课前预习 

1. [预习视频](https://www.bilibili.com/video/BV1Rt4y1B7sC)

1. [手写minivue](https://www.bilibili.com/video/BV1Rt4y1B7sC)

1. [vue3源码结构的介绍](#vue3源码结构的介绍)

1. [reactivity核心流程](#reactivity-核心流程)

1. [runtime-core初始化的核心流程](#runtime-core-初始化的核心流程)

预习过后的练习代码 [demo01](./demos/demo1/)


Vue 模块结构

![vue-module-structure](./images/vue-module-structure.png)

## Vue3源码结构的介绍


可以看到 `vue` 直接依赖 `@vue/compiler-dom` （处理编译） 和 `@vue/runtime-dom` （处理运行时）这两个模块。

其中 `@vue/compiler-dom` 底层又依赖了 `@vue/compiler-core` 这两个库互相配合使用用于支持解析vue组建，其中 `@vue/compiler-sfc` 是用于解析单文件组建`.vue`的 它依赖了  `@vue/compiler-dom`  以及  `@vue/compiler-core`。


`@vue/compiler-core` 用于处理 `tmeplate` 它会把 `template` 变成一个 `render` 函数。


`@vue/runtime-dom` 用于处理运行时。


`@vue/runtime-dom` 依赖 `@vue/runtime-core` ， `@vue/runtime-core` 用于处理核心运行时， `@vue/runtime-core` 依赖  `@vue/reactivity`, `@vue/reactivity` 实现了 vue 的响应式， 这几个库都可以独立使用。


`@vue/runtime-dom` 导出了 所有 `@vue/runtime-core` 和 `@vue/reactivity` 的 api 这个库用于确保vue的特性在运行时能够得到保证。

## reactivity 核心流程


![reactivity](./images/reactivity.png)

reactive 的作用就是接收一个对象把它变成一个代理对象通过代理对象去访问原来对象的值，其内部实现了依赖收集（重写get）以及通知依赖更新（重写set）的功能

### get

通过调用 createGet 这个函数来创建 get 。

1. track 依赖收集

1. 返回值 `Reflect.get(target, key, receiver)`

### set

通过调用 createSet 这个函数来创建 set 。

1. 更新值 `Reflect.set(target, key, value,  receiver)`

1. trigger 通知更新


### effect

`effect` 接收用户给到的 function， 在function里面一般会存在一些计算和赋值操作。


当函数里面的 reactive 对象被获取值的 key 发生更新的时候 effect 会再次执行 从而达到被赋值的容器再次更新的目的。


`effect` 接收的函数后会以函数为参数创建一个 `ReactiveEffect` 对象将 函数存储在 `fn` 上 `fn` 会被`run`函数立即执行触发get操作。


`run` 在执行的过程中会更新 `activeEffect` 以便收集到对应的依赖 (在 `track` 中使用)


## update

当修改了相应式对象(`reactive-object`)的值的时候把所有收集到的 `effect` 执行一遍(`trigger`)


## runtime-core 初始化的核心流程

1. createApp 返回一个带有 mount 方法的对象

1. `mount`方法会基于根组件生成一个虚拟节点 （初始化开始）

1. `vnode` 含有 el 、 key 、 props 、 shapFlag 、 type 等属性

1. 其中 `type` 属性就是 `component` 

1. 调用 `render` 方法、`render` 方法内部 调用 `patch`
   
1. `patch` 方法会根据虚拟节点的不同类型（`type` 和 `shapeFlag`）来选择不同的处理方法

1. `patch` 遇到的 vnode 如果是组件类型 `component` 调用 `processComponent` 方法来处理

1. `processComponent` 内部会 根据 `n1` 是否存在来判断组件是否是首次渲染 如果是首次渲染则会调用 `mountComponent` 否则会调用 `updataComponent`

1. `mountComponent` 会通过 `createComponentInstance` 函数 创建一个 `component instance` 实例会包含 `ctx` 、 `emit` 、 `isMounted` 、`next` 、 `parent` 、`props` 、 `provides`、`slots` 、 `type` 、`vnode` 等属性 接下来会 `setupComponent` 以及 `setupRenderEffect`。

1. `setupComponent` 会初始化 `props` 、 `slots` 调用 `setupStateFulComponent` 这些过程都是在收集数据为以后的算法计算坐准备 （程序就是数据结构+算法）  设置 `render` 函数 

1. `setupStateFulComponent` 会 挂载 代理数据到 组件实例上 会调用 setup 函数并处理 setup 返回的数据

1. `setupRenderEffect` 会 判断实例对象是否初始化如果已经初始化了会调用更新逻辑 否则会 初始化 `render` 函数获取到 vnode

1. `setupRenderEffect` 在初始化组件的时候会继续 `patch` 子元素 (开启递归分析)

1. `patch` 方法遇到的 vnode 如果是 Element 类型的话会调用 `processElement` 方法来处理

1. `processElement` 同样会根据 `n1` 是否存在判断元素是否是首次渲染

1. `processElement` 初始化逻辑会调用 `mountElement` ，  `mountElement` 会调用 `createElement` （vue3可以自定义渲染器比如需要通过canvas渲染就可以通过更改createElement的内部实现来达到目的） 创建真实 `dom` 元素 有子节点会调用 `mountChildren` ，  `mountChildren` 内部遍历 `vnode` 并且调用 `patch` 递归渲染 接下里会处理 `props`（默认渲染器`hostPatchProp`），最后插入父节点; `mountElement` 如果发现是文本节点则会调用 `hostSetElementText` (默认渲染器) 插入文本

1. 最终递归挂载到根元素上


### 总结

1. patch 函数就是一个拆箱的过程

1. App 是一最大的一个箱子

1. 拆箱的过程中会拆解 为不同类型的子箱子 `Component`、`Element`、`Text` 等等

1. `Component` 初始化会生成为一个虚拟节点 (初始化组件信息调用render函数生成vnode)

1. 渲染vnode的过程中递归 `patch` 继续拆箱直到所有子元素拆解完毕生成为目标视图(默认为`dom`)

