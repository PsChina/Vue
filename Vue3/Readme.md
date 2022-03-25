# Vue3 源码解析学习

这个文件夹作为一个笔记本记录PsChina的Vue3源码学习笔记。

课前预习 

1. [预习视频](https://www.bilibili.com/video/BV1Rt4y1B7sC)

1. [手写minivue](https://www.bilibili.com/video/BV1Rt4y1B7sC)

1. [vue3源码结构的介绍](#vue3源码结构的介绍)

1. [reacttivity核心流程](#reacttivity-核心流程)

预习过后的练习代码 [demo01](./demos/demo1/)



## Vue3源码结构的介绍

Vue 模块结构

![vue-module-structure](./images/vue-module-structure.png)


可以看到 `vue` 直接依赖 `@vue/compiler-dom` （处理编译） 和 `@vue/runtime-dom` （处理运行时）这两个模块。

其中 `@vue/compiler-dom` 底层又依赖了 `@vue/compiler-core` 这两个库互相配合使用用于支持解析vue组建，其中 `@vue/compiler-sfc` 是用于解析单文件组建`.vue`的 它依赖了  `@vue/compiler-dom`  以及  `@vue/compiler-core`。


`@vue/compiler-core` 用于处理 `tmeplate` 它会把 `template` 变成一个 `render` 函数。


`@vue/runtime-dom` 用于处理运行时。


`@vue/runtime-dom` 依赖 `@vue/runtime-core` ， `@vue/runtime-core` 用于处理核心运行时， `@vue/runtime-core` 依赖  `@vue/reactivity`, `@vue/reactivity` 实现了 vue 的响应式， 这几个库都可以独立使用。


`@vue/runtime-dom` 导出了 所有 `@vue/runtime-core` 和 `@vue/reactivity` 的 api 这个库用于确保vue的特性在运行时能够得到保证。

## reacttivity 核心流程


![reactivity](./images/reactivity.png)

reactive 的作用就是接收一个对象把它变成一个代理对象通过代理对象去访问原来对象的值，其内部实现了依赖收集（重写get）以及通知依赖更新（重写set）的功能

### get

通过调用 createGet 这个函数来创建 get 。

1. track 依赖收集

1. 返回值 `Reflect.get(target, key, receiver)`

### set

通过调用 createSet 这个函数来创建 set 。

1. 更新值 `Reflect.set(target, key, value,  receiver)`

1. notice 通知更新


### effect

`effect` 接收用户给到的 function， 在function里面一般会存在一些计算和赋值操作。


当函数里面的 reactive 对象被获取值的 key 发生更新的时候 effect 会再次执行 从而达到被赋值的容器再次更新的目的。


`effect` 接收的函数后会以函数为参数创建一个 `ReactiveEffect` 对象将 函数存储在 `fn` 上 `fn` 会被`run`函数立即执行触发get操作。


`run` 在执行的过程中会更新 `activeEffect` 以便收集到对应的依赖 (在 `track` 中使用)


## update

当修改了相应式对象(`reactive-object`)的值的时候把所有收集到的 `effect` 执行一遍(`trigger`)





