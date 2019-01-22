const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  'devServer': {
    'proxy': {
      '/api/*': {
        'changeOrigin': true,
        'pathRewrite': {'^/api': ''},
        'secure': false,
        // Your server api
        'target': 'http://javaport.xnfhtech.com:8080',
      },
    },
  },
  'entry': './entry.js',
  'output': {
    'filename': 'bundle.js',
    'path': `${__dirname}/dist`,
  },
  'plugins': [
    new HtmlWebpackPlugin({
      'template': 'index.html',
    }),
  ],
}
