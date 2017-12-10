var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsWebpackPugin = require('uglifyjs-webpack-plugin');
var path = require('path');
var url = require('url');
var qs = require('querystring');


module.exports = {
    entry:['./entry.js'],
    output:{
        filename:'bundle.js', 
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            { test:/\.js$/,use:['babel-loader'] },
            { test:/\.css$/,use:['style-loader','css-loader'] },
            
            { test:/\.(png|jpg|gif)$/,use:['url-loader'] },
            { test:/\.html$/,use:['html-loader'] },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'learn webpack',
            template:'./index.html',
            filename:'index.html',
            minify:{
                minifyCSS:true,
                minifyJS:true,
                minifyURLs:true,
                collapseInlineTagWhitespace:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true,
                removeComments:true,
                removeEmptyAttributes:true,
                removeEmptyElements:true,
                removeRedundantAttributes:true,
                removeScriptTypeAttributes:true,
                removeStyleLinkTypeAttributes:true,
                trimCustomFragments:true,
                useShortDoctype:true
            }
        }),
        new UglifyJsWebpackPugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:__dirname,
        port:8080,
        open:true,
        proxy: {
            '/': {
                target: '/', //要代理到的地址
                secure: false, //若地址为https，需要设置为false
                onProxyReq: function(proxyReq, req, res) { //提前设置一些代理的头部，如token信息等
                    var dataBase={
                        data:'haha i got data'
                    }
                    var method = req.method,
                        urlObj = url.parse(req.url),
                        pathname = urlObj.pathname,
                        getParams = qs.parse(urlObj.query);

                    res.setHeader('Access-Control-Allow-Origin','*');
                    if(req.method==="GET"){
                        switch(pathname){
                            case '/ceshi':  
                                res.setHeader('content-type','application/json;charset=utf-8')
                                res.write(JSON.stringify(dataBase));
                                res.end()
                            break;
                            default :
                                res.end('No such api!')
                            break;
                        }
                    }
                },
                //...其他配置请自行查阅文档http-proxy-middleware文档
                onProxyRes: function(proxyRes, req, res){
                    console.log('onProxyRes')
                },
                onError:function(err, req, res){
                    console.log('onError')
                }
            }
        }
    }
}