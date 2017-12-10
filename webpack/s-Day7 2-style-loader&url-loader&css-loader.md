# loader
loader的作用是使得webpack 能识别非javascript文件

loader 应该写在 module 下 的 rules 中 

rules 下有 2个属性

1、test 你要匹配的文件类型

2、use 你要对这类文件使用何种loader

loader 的执行顺序是 从上到下 从做到右的


## css-loader
    css-loader 的作用是将css作为一个模块import 打包到js里面 如果 不引入那么import css 的时候会报错

    npm i css-loader

### 配置
```js
    module.exports = {
        //...
        module:{
            rules:[
                {test:/\.css$/,use:['css-loader']} // 但是这仅仅是将 css 打包到了js里面 类名还无法在html 中直接用 需要配合style-loader使用
            ]
        }
        //...
    }
```

## style-loader
    style-loader 的作用是使得js里的css能被html读取

    npm i style-loader

### 配置
```js
    module.exports = {
        //...
        module:{
            rules:[
                {test:/\.css$/,use:['style-loader','css-loader']} // 但是这仅仅是将 css 打包到了js里面 类名还无法在html 中直接用 需要配合style-loader使用
            ]
        }
        //...
    }
```

## url-loader
    url-loader 是当html 中的src 或 css 中 的url 遇到图片的时候 将图片作为一个模块来 import 的时候需要用到的装载器

    npm i url-loader

### 配置

```js
    module.exports = {
        //...
        module:{
            rules:[
                {test:/\.(png|jpg|gif)$/,use:['url-loader']} // 将图片解析为base64格式的数据直接填在src中
            ]
        }
        //...
    }
```

## html-loader
    当 html 中含有img 需要将图片打包为base64格式的时候 需要用到 html-loader 不然图片将无法正常显示

### 配置
```js
    module.exports = {
        //...
        module:{
            rules:[
                {test:/\.html$/,use:['html-loader']} // 将图片解析为base64格式的数据直接填在src中 需要将网页import到入口文件中 这时 <%= htmlWebpackPlugin.oprions.title %> 将失效
            ]
        }
        //...
    }
```

## babel-loader
    babel-loader 是将js里的es6语法转换为es5语法的

    npm i babel-loader

    npm i babel-core

    npm i babel-preset-env / npm i babel-preset-es2015 推荐第一个

    vi .babelrc

    {
        "presets":["env"]
    }

    或者

    {
        "presets":["es2015"]
    }
 
    这取决于你下了哪个preset
    
### 配置
```js
    module.exports = {
        //...
        module:{
            rules:[
                {test:/\.js$/,use:['babel-loader']}
            ]
        }
        //...
    }
```
