## 组件
什么是组件？
组件 (Component) 是 Vue.js 最强大的功能之一。组件可以 __扩展 HTML 元素__ ，__封装可重用的代码__。在较高层面上，__组件是自定义元素__，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 is 特性进行了扩展的原生 HTML 元素。

__所有的 Vue 组件同时也都是 Vue 的实例__，所以__可接受相同的选项对象__ (除了一些根级特有的选项) 并__提供相同的生命周期钩子__。

## 什么是is特性

意思就是有些元素，比如 ul 里面只能直接包含 li元素，像这样：
```html
<ul>
    <li></li>
</ul>
```
而不能：
```html
<ul>
    <your-component>
</ul>
```
这样就不能复用your-component这个组件了，如果要达到我们的目的，我们就要使用is特性像这样：
```html
<ul>
    <li is="your-component"></li>
</ul>
```

## 定义组件 有三种方式

### 1 全局定义

```js
    Vue.component('myFirstComponent',{ // 定义好就可以直接用  myFirstComponent 是它的名字
        // 用起来 就是 这样的 <my-first-component></my-first-component> 或者 <my-first-component/>
        template:'<div>全局组件</div>'
    })
```

### 2 局部定义 并注册

```js
    // 定义局部组件 

    const item = { // 定义一个空对象
        template:` <div>局部组件</div> ` // 里面有一个模版
    }
    // 此时 注册了吗？ 没有

    new Vue({
        el:'#app',
        data(){
            return {
                msg:'Hello Vue Components!'// 组件
            }
        },
        components:{ // 复数  可能有很多个 子 组件
            // 在这里注册
            item 
            // 简写 相当于 item:item
        }
        
    })    
```

### 3 定义单文件组件（.vue文件）

item.vue
```html
<template>
  <div>
    <!-- elements... -->
  </div>
</template>

<script>
export default {
    data(){

    },
    //...
}
</script>

<style>
    .my-class{

    }
</style>
```

## 组件内部细节
```js
    Vue.component('mycomponent',{
        props:['myMsg'], // 目前 里面的值 是undefined 如何让它有值呢 答案是 在html 上 传递
        template:`
        <div> <!-- 一个根元素内部可以含有多个子元素 -->
            <h2>我的局部组件 {{myMsg}}</h2>
            <div v-text="innerText">
            </div>
            <button @click="click()">点击事件</button>
            <component-b></component-b>
            <p> {{'test'|toUpperCase()}} </p>
        </div>
        `,
        data(){ // 基本数据
            return {
                innerText:'我是组件AAAAA'
            }
        },
        methods:{ // 函数
            click(){
                console.log('子组件内部按钮被点击')
            }
        },
        watch:{ // 观察者

        },
        computed:{ // 计算属性

        },
        components:{ // 注册子组件
            componentB
            // 注册了 一个组件B 意味着 可在组件A内部 使用组件B
        },
        filters:{ // 注册局部过滤器
            // 写 局部过滤器
            toUpperCase(input){ // 这个 过滤器是局部的 只能在组件A 中使用
                return input.toUpperCase();
            }   
        },
        directives:{ // 注册 局部自定义指令 (没学)

        },
        beforeCreate(){ 
            console.log('子组件将要被创建') 
        },
        created(){ 
            console.log('子组件被创建') 
        },
        beforeMount(){ 
            console.log('组件被挂载之前')
        },
        mounted(){
            console.log('组件被挂载之后')
        },
        beforeUpdate(){ 
            console.log('组件被更更新之前')
        },
        updated(){ 
            console.log('组件已经更新')
        },
        beforeDestroy(){ 
            console.log('组件销毁之前')
        },
        destroyed(){ 
            console.log('组件已经被销毁')
        },
        activated(){ // 被 keep-alive 包裹+ v-if生效 
            console.log('激活')
        },
        deactivated(){ // 被 keep-alive 包裹+ v-if生效 
            console.log('失效')
        },
        errorCaptured(error){ // 捕捉子组件的错误 

        }        
    })
```

## props传值

```html

<div id="app">
    <my-component v-bind:data="msg"></my-component>
    <my-component :data="msg"></my-component>
    <!-- 如何让msg显示在子组件？？？？ :data="msg" 以上2个元素等价 第一个全写 第二个简写-->
</div>

<script>

    // const myComponent = { // 定义一个（局部）组件
    //     props:['data'], // 接收一个数据 
    //     template:`<div v-text="data"></div>` // 将数据显示在 div 上
    // }
   
    // 定义全局组件 不需要注册

    Vue.component('myComponent',{ 
        props:['data'], // 接收一个数据 
        template:`<div v-text="data"></div>` // 将数据显示在 div 上
    })
    new Vue({
        el:'#app',
        data(){
            return {
                msg:'Hello Props!' // 数据在 父组件 
            }
        },  
        // components:{ //注册组件
        //     myComponent
        // }
    })
</script>
```


## props验证

```html
<div id="app">
    {{ msg }}
    <mycomponent :data="msg"></mycomponent>
</div>

<script>
    Vue.component('mycomponent',{
        props:{ // 上次写的是 数组['data'] 这次写的是对象{}     
            data:{
                required:true, // 必须传递数据的属性 没有传递会报错
                type:[Array,String] // 可以接收数组或者字符串类型的数据
            },
            other:{
                required:false, // 默认值 可选的属性
                // type不写为任意类型
            }
        },
        // props:['data'], // 传递 什么类型数据 都可以 但是 我只想要数组 不想要其他类型怎么办？
        template:`<div> 组件接收的数据: <span v-text="data"></span> </div>`
    })

    new Vue({
        el:'#app',
        data(){
            return {
                msg:[1] // 数组
            }
        }
    })
</script>
```