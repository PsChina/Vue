# 这是一个配置vue路由的demo

## Index

1. [基本配置](#vue-router)
1. [默认路由](#默认路由)
1. [嵌套](#路由嵌套)
1. [路由传参](#路由传参)
1. [按需加载](#按需加载)
1. [环境搭建](#手动搭建-webpack-环境)

## vue-router

vue-router 是一个帮助我们管理 vue 多页面之间的关系的库。

他是一个 vue 插件可以通过npm获取。

```bash
npm i vue-router -S
```

因为他是一个vue插件所以我们需要使用 Vue.use 来使用它。

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

然后我们需要配置路由它是一个数组

```js
import page2 from './routes/page2'
const routes = [
    { path:'/route-page1', component:{ template:'<div>page1</div>' } },
    { path:'/route-page2', component:{ template: page2 }, //如果你认为在js内书写html是一件很累的事 你可以 import 一个组件
    // ...
]
```

接下来我们就可以 new 一个路由实例了

```js
const router = new VueRouter({
    routes, //这里需要你对es6语法有所了解
})
```

最后在将它注册在 vue 的根实例中

```js
new Vue({
    // ...
    router
    // ...
})
```

## 默认路由

在 routes 内添加一个 path 为 `/` 的路由重定向改路由路径即可。

```js
const routes = [
    {
        path: '/',
        redirect:'/myHomePagePath'
    }
]
```

## vue-router in html

### router-view

它是一个容器用于显示路由组件 router-view 就是显示各个路由组件的

### router-link

他是触发路由的按钮

#### to 属性

```html
<router-view></router-view>
<router-link to="/route-page1">显示page1</router-link>
<router-link to="/route-page1">显示page2</router-link>
```

#### tag 属性

router-link 默认是a链接如想更改可以用 tag 修改

```html
<router-link to="/route-page1" tag="span">显示page1</router-link>
```

#### active-class 属性

active-class 标记选中路由

```html
<style>
    .active{
        color:green
    }
</style>
<router-link active-class="active" to="/route-page1" tag="span">显示page1</router-link>
<router-link active-class="active" to="/route-page2" tag="span">显示page2</router-link>
```

### 路由嵌套

路由嵌套需要routes内完成

```js
import page2 from './routes/page2'
import child1 from './routes/child1'
import child2 from './routes/child2'
const routes = [
    { path:'/route-page1', component:{
        template:`
        <div>
            这是一个含有子路由的页面
            <router-view><router-view>
            <router-link to="/route-page1/child1" >显示page1/child1</router-link>
            <router-link to="/route-page1/child2" >显示page1/child2</router-link>
        </div>
        ` },
        children:[
            {path:'child1', component: child1},
            {path:'child2', component: child2}
        ]
        },
    { path:'/route-page2', component:{ template: page2 }, //如果你认为在js内书写html是一件很累的事 你可以 import 一个组件
    // ...
]
```

## 路由传参

```js
import page1 from './routes/page1'
import page2 from './routes/page2'
const routes = [
    {
        path:'router/:param',
        component: page1
    },
    {
        path:'router/subattr=:param',
        component: page2
    }
]
```

参数传递

```html
<router-link to="/router/参数">路由1</router-link>
<router-link to="/router/subattr=参数">路由2</router-link>
```

```js
// <div @click="go">路由1</div>
export default {
    methods:{
        go(){
           const param = '参数'
           this.$router.push({
               path:`/router/${param}`
           })
        }
    }
}
```

接收参数

```html
<div>{{$route.params.param}}</div>
```

## 按需加载

假设页面上有 3 个路由 `page1`、`page2`、`page3` 为了优化首屏加载速度，我们应该如何配置才能使得当用户点击这个路由的时候才下载对应资源呢？ 以下便是答案：

router-config.js

```js
const Home = () => import('./pages/home')
const Page1 = () => import('./routes/page1')
const Page2 = () => import('./routes/page2')
const Page3 = () => import('./routes/page3')
export default [
    { path:'/', component: Home },
    { path:'/page1', component: Page1 },
    { path:'/page2', component: Page2 },
    { path:'/page3', component: Page3 },
]
```

当然上面的代码用到 js 的新特新 `import()` 所以需要修改 `webpack.config.js`

需要下载 `babel-plugin-syntax-dynamic-import`

```bash
npm i babel-plugin-syntax-dynamic-import -D
```

对应的新版本是 `@babel/plugin-syntax-dynamic-import`

```bash
npm i @babel/plugin-syntax-dynamic-import -D
```

webpack.config.js

```js
module.exports = {
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                use: [
                        { // 使得 webpack 支持 jsx语法以及 es6 ,es7 等等
                            loader: 'babel-loader',
                            options:{
                                presets:['env'], // 如果下载的是@babel/preset-env 则写 @babel/preset-env 否则写 env
                                plugins:['syntax-dynamic-import']  // 新版本插件写法 @babel/plugin-syntax-dynamic-import
                            }
                        }
                    ] },
        ]
    }
}
```

详情请看demos [Router-Loaded-On-Demand](https://github.com/PsChina/Vue/tree/master/VueRouter/demos/Router-Loaded-On-Demand)

## 手动搭建 webpack 环境

```js
const webpack = require('webpack') // 访问内置插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 加载 index.html 的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin') // .vue 单文件组件加载插件
const path = require('path') // 获取路径模块

function resolve (dir) { // 简写resolve
    return path.resolve(__dirname, dir)
}

module.exports = {
    entry:'./src/main.js', // 入口文件
    output:{
        filename:'bundle.js', // 出口文件
        path: resolve('build') // 出口路径
    },
    module:{
        rules:[
            { test: /\.html$/, use: 'html-loader' }, // 使得 webpack 支持 import *.html
            { test: /\.css$/, use: ['style-loader','css-loader'] }, // 使得 webpack 支持 import *.css
            { test: /\.(js|jsx)$/, use: 'babel-loader' }, // 使得 webpack 支持 jsx语法以及 es6 ,es7 等等
            { test: /\.vue$/, use: 'vue-loader' }, // 使得 webpack 支持 import *.vue
            // { test: /\.ts$/, use: 'ts-loader' }, // 使得 webpack 支持 import *.ts
            { test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$/, use: [{ loader: 'url-loader', options:{limit: 10000} }]}, // 使得 webpack 支持 import 图片 iconfont mp3 等等
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({ template: './index.html' }), // 指明入口html
        new VueLoaderPlugin(), // 使用加载 vue 的插件
        new webpack.HotModuleReplacementPlugin() // 自动刷新网页
    ],
    optimization: {
        minimizer: [
          new UglifyJsPlugin() // 压缩js
        ]
    },
    devServer:{
        port:3333, // 本地开发端口号 3333
        hot:true, // 打开自动刷新
        contentBase: resolve(__dirname) // 本地服务器根目录
    },
    mode: 'production', // 默认打包环境
    resolve: {
        extensions: ['.js', '.vue', '.json'], // 只能识别文件无需书写后缀
        alias: {
          'vue$': 'vue/dist/vue.esm.js', // vue/dist/vue.esm.js别名为vue$ 由于vue内部使用了vue$所以需要提供别名
          '@': resolve('src'), // src 的别名 @
        }
      },
}
```
