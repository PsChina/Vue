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