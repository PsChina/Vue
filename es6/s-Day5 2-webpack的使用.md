# webpack 的学习
  简介: webpack 是一个自动化构建工具。 类似于gulp 但是使用起来比gulp方便。

## 如何使用 webpack
  1、和gulp 一样 需要全局安装 npm install webpack -g
  2、需要一个入口文件 webpack.config.js || es6 webpack.config.babel.js
  3、需要本地依赖 webpack  npm install webpack --save-dev
  4、开始书写 config

## webpack 的 配置项
  如果没有集成es6 那么需要用 module.exports 来抛出配置项

  module.exports = {

  }

  如果有es6环境 只需要 用 export default 来抛出 但是文件名就不叫webpack.config.js => webpack.config.babel.js

  export default {

  }

####用es6来书写 webpack.config.babel.js
  1、需要下载babel                  npm i babel
  2、需要下载babel-preset-env       npm i babel-preset-env (为什么不是babel-preset-2015) 因为这个包只能编译es6 不能编译 es7 、 es8 甚至 9等等。
  3、需要书写 .babelrc              touch .babelrc      内容是  { "presets":["env"] }   env 是 环境environment的缩写
  4、需要下载 babel-core            npm i babel-core

### entry (入口)

  写在 

  export default {

  }

  里面

```js
  export default {
    entry:'./entry.js' //你的入口文件
  }
```

### output (出口)

  写在 

  export default {

  }

  里面

```js
  export default {
    output:{
      path: __dirname+'/dist',  //  __dirname 等于当前目录   整个意思是 将打包好的东西输出到当前目录下的 dist 文件夹下 
      filename:'bundle.js' // 你打包好的文件叫什么。
    }
  }
```

### module (这是你要webpack帮你做的事)

  写在 

  export default {

  }

  里面

module 对象里面 用 loaders 声明 规则 和 用 rules 声明规则 是一样的 他们的值都是一个数组
但是
```js
loaders:[
            {
                test:'/\.js$/',
                exclude:'/node_modules', 
                loader:'babel-loader'
            }
        ]
rules: [ // 新写法
            { test: /\.js$/, use:['babel-loader'] },
            { test: /\.vue$/, use:['vue-loader'] }
        ]
```
```js
  export default {
    module:{
      rules:[
        {test:/\.js$/,use:['babel-loader']} // 用于将es6,7,8,9 转成es5的。
      ]
    }
  }
```

### plugin (插件 这也是webpack 帮你做的事)

  写在 

  export default {

  }

  里面

```js
  export default {
    plugins:[
      new yourPluginFn()
    ]
  }
```

#### 以上配置 基本上都要配置好才能正常工作。



## demo
```js
var webpack = require('webpack') // 本地安装webpack
var UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js 的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');  // 获取html 的插件 

var path = require('path')
module.exports = {
    entry:'./enrty.js',
    output:{  // 我们的项目 会在 打包压缩之后 输出的路径 名字
        path:__dirname+'/dist/',   // 路径  就是你的最终的产品  
        filename:'bundle.js' // js 的名字
    },
    module:{
        rules:[
            {test:/\.js$/,use:['babel-loader']}, // es6 转 es5
            {test:/\.html$/,use:['html-loader']} // 打包html
        ]
    },
    plugins:[
        new UglifyJsPlugin(),  // 压缩js
        new webpack.HotModuleReplacementPlugin(), // 热替换
        new HtmlWebpackPlugin({ //
            template:'./index.html' // 获取html 将js 链入js 并且配合devServer 启动热替换
        })
    ],
    devServer:{
        port:8080,  // devServer 本地服务端口号
        hot:true, // 热替换开关
        inline:true, // 热替换开关
        open:'http://localhost:8080', // 自动打开浏览器窗口
        contentBase:__dirname // 服务器根目录
    }
}

```