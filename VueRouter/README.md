# 这是一个配置vue路由的demo

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

## 手动搭建 vue webpack4.0 运行环境
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
            { test: /\.(png|jp?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$/, use: [{ loader: 'url-loader', options:{limit: 10000} }]}, // 使得 webpack 支持 import 图片 iconfont mp3 等等
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