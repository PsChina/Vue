# webpack 

## 多入口多出口的配置

```js
module.exports = {
    entry:{
        jsfileName1:'./js1.js',
        jsfileName2:'./js2.js'
    },
    output:{
        filename:'[name].js',
        path:__dirname+'/dist' // 输出的目录  var path = require('path')   path.resolve(__dirname,'/dist')
        }
}
```

## 多入口单出口的配置
```js
module.exports = {
    entry:['./js1.js','./js2.js'],
    output:{
        filename:'bundle.js',
        path:__dirname+'/dist' // 输出的目录  var path = require('path')   path.resolve(__dirname,'/dist')
        }
}
```
## demo
```js
var webpack = require('webpack') // 本地安装webpack
var UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js 的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');  // 获取html 的插件 

var path = require('path')
module.exports = {
    entry:'./enrty.js',
    output:{  // 我们的项目 会在 打包压缩之后 输出的路径 名字
        path:__dirname+'/dist/', // 路径  就是你的最终的产品  
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
            title:'webpackLesson',  // .html 文件的 title 里写 <%= htmlWebpackPlugin.options.title %>
            filename:'index.html', // 如果不写默认就是它
            template:'./index.html', // 获取html 将bundle.js 链入 
            inject:true, //默认为 true script标签位于html文件的 body 底部 填 body 和 填true 效果一样 head=> script 标签位于 head 标签内 false => 不生成script 标签
            minify:{
              removeAttributeQuotes: true // 移除属性的引号  https://github.com/kangax/html-minifier#options-quick-reference 可以查看完整选项
            },
            hash:true, //hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false 。
            showErrors:true, // 默认就是true  显示错误信息
            cache:true, // true 表示只有在内容变化时才生成一个新的文件。
            // chunks:['bundle.js','other.js'] 多入口的时候 会生成多个js  你可以通过这个字段 来选择需要将哪些js 引入你的html 默认是全部引入 所以一般不配置
            excludeChunks:['webpack.config.js'],// 这个字段的意思是不包含某个js
            chunksSortMode:'dependency', // 按照依赖循序引入
            /*
            这个选项决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}'。

            'dependency' 不用说，按照不同文件的依赖关系来排序。
            'auto' 默认值，插件的内置的排序方式。
            'none' 应该是你chunks 那个数组的顺序。
            {function} 提供一个函数
            chunksSortMode: function (chunk1, chunk2) { // 多入口 多出口的依赖顺序。
                var order = ['module3', 'module2','module1'];  // 这是你的顺序 这是你的 入口文件的 属性名[键名]
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2 ;  
            }            
            */      
            xhtml:false //一个布尔值，默认值是 false ，如果为 true ,则以兼容 xhtml 的模式引用文件。
        })
    ],
    devServer:{
        port:8080,  // devServer 本地服务端口号
        hot:true, // 热替换开关
        inline:true, // --inline选项会自动把webpack-dev-server客户端加到webpack的入口文件配置中。 (整个页面会重载)
        open:'http://localhost:8080', // 自动打开浏览器窗口
        contentBase:__dirname // 服务器根目录
    }
}

```