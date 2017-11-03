#尝试使用Vue.js
    前言: 请参考 https://cn.vuejs.org/v2/guide/  
## 获取vue.js
    npm i vue --save-dev
## 开始

    1、新建index.html
    2、引入 vue

index.html 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app">

    </div>
</body>
<script src="./vue.js"></script>
</html>
```
### new一个Vue实例 以及 {{}}语法

```html
    <div id="app">
        {{message}}
    </div>
```
```js
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!'
        }
    })
```
    数据和 DOM 已经被绑定在一起，所有的元素都是响应式的

    可以在控制台 修改 app.message 的值 观察。

### v-bind
```html
<div id="app1">
    <div v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
    </div>
</div>
<script>
    var app2 = new Vue({
            el: '#app1',
            data: {
                message: '页面加载于 ' + new Date().toLocaleString()
            }
        })
</script>
```
     自定义属性v-bind:title可以 绑定 原生属性title  使得title的值取决于v-bind:title 这个自定义属性所对应的值 这个变量所存储的值。

     举一反三
     placeholder="账号" => v-bind:placeholder="placeHolder" | data:{placeHolder:'账号'}
     class='box' => v-bind:class="myclass" | data:{myclass:'box'}

     等等


