# 简介
这是一个vue路由按需加载的demo

vue路由按需加载实现的途径有3种

1 vue 异步组件

2 es6 import() 提案

3 webpack 的 require.ensure() 

本 demo 用的是 es6 的 `import()` 提案 

需要下载 `babel-plugin-syntax-dynamic-import`

```bash
npm i babel-plugin-syntax-dynamic-import -D
```

对应的新版本是 `@babel/plugin-syntax-dynamic-import`

```bash
npm i @babel/plugin-syntax-dynamic-import -D
```

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

# run tips

## 1 install system devDependencies

```bash
npm i webpack -g
npm i webpack-dev-server -g
```

## 2 install dependencies

```bash
npm i
```

## 3 run 

```bash
npm run dev
```