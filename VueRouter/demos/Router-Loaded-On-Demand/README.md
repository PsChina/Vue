# Introduction
简介:这是一个vue路由按需加载的demo

vue路由按需加载实现的途径有3种

1 vue 异步组件

2 es6 import() 提案

3 webpack 的 require.ensure() 

本demo用的是 es6 的import 提案 

需要依赖 babel-plugin-syntax-dynamic-import
```bash
npm i babel-plugin-syntax-dynamic-import -D
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
                                presets:['env'],
                                plugins:['syntax-dynamic-import'] 
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