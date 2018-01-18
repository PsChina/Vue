#尝试使用Vue.js
    获取vue.js
    npm i vue --save-dev

    https://cn.vuejs.org/ (官网的教程非常详细)

## 开始

    1、新建index.html
    2、引入 vue

## new一个Vue实例 以及 {{}}语法

```html
    <div id="app" v-on:click="clickfn">  <!-- Vue 根元素不能是 html 或者body 所以我们找一个div来用 -->
        {{message}}
    </div>
```
```js
    var app = new Vue({
        el: '#app',
        data: { // 数据 类似于angular的 scope 与之不同的是这里不存放方法
            message: 'Hello Vue!'
        },
        methods:{ // 存放方法
            clickfn(){
                console.log('did click') 
            }
        }
    })

    /*
        methods:{ // 存放方法
            clickfn(){
                console.log('did click') 
            }
        }
        等价于
        methods:{ // 存放方法
            clickfn:function(){
                console.log('did click') 
            }
        }            
    */
```
    数据和 DOM 已经被绑定在一起，所有的元素都是响应式的

    可以在控制台 修改 app.message 的值 观察。




