# webpackPlugin
webpack plugin 带来了更强大的功能

## commons-chunk-plugin 
这个插件用于提取公共的 js

适用于多入口多出口的情况

demo
```js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:{
        entry:'./entry.js', //entry 引入了module1.js
        enrty2:'./entry2.js' //entry2 也引入了module1.js 导致重复引入
    },
    output:{
        filename:'[name].js',
        path:__dirname+'/dist'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html',
            minify:{
                removeComments: true,//清除HTML注释
                collapseWhitespace: true,//压缩HTML
                minifyJS: true,//压缩页面JS
                minifyCSS: true//压缩页面CSS
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // names:['公共模块1.js','公共模块2.js'],
            name:'module1.js',  // 当你只有一个公共模块的时候用 这个就是你的公共模块  可以传数组
            filename:'public.js',  // 这个是你的公共模块的 总文件 公共模块将被提取到这个文件中
            minChunks:2 // 就是说 你有几个 引用了公共模块的文件 但是必须小于等引用公共模块的文件数 大于2
        })
    ]
}
```

## extract-text-webpack-plugin
这个插件用于提取css 就是将css 从js里面分离出来

## optimize-css-assets-webpack-plugin 
这个插件用于将分离出来的css打包的

demo
```js
var  ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var  HtmlWebpackPlugin = require('html-webpack-plugin')
var  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    entry:'./assets/entry.js',
    output:{
        filename:'bundle.js',
        path:__dirname+'/dist'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextWebpackPlugin.extract({
                    fallback:['style-loader'],
                    use:['css-loader']
                })
            }
        ]
    },
    plugins:[
        new  HtmlWebpackPlugin({
            css:['style.css'],
            title:'My App',
            filename:'index.html',
            template:'./assets/index.html'
        }),
        new ExtractTextWebpackPlugin('style.css'),
        new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: {removeAll: true } },
                canPrint: true
              })
    ],
    resolveLoader:{ // 当你在 loader 名的时候可以忽略 -loader 后缀 也就是是说 css-loader 可以被写成 css 
        moduleExtensions:['-loader']
    }
}
```

