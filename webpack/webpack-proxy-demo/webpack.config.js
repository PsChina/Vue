var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './entry.js',
    output:{
        path:__dirname + '/dist',
        filename:'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devServer:{
        proxy:{
            '/api/*': {
                target: 'http://javaport.xnfhtech.com:8080', // your server api
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
                secure: false
            }
        }
    }
}