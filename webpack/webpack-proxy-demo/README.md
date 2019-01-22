# How to use webpack proxy

怎么使用 webpack proxy 解决跨域问题。

```js
  'devServer': {
    'proxy': {
      '/api/*': { //要替换的url。
        'changeOrigin': true,
        'pathRewrite': {'^/api': ''}, //被替换的部分。
        'secure': false, // 是否支持在http环境 否则只支持 https。
        // Your server api。
        'target': 'http://javaport.xnfhtech.com:8080', // 替换后的部分。
      },
    },
  },
```

[demo](https://github.com/PsChina/Vue/blob/master/webpack/webpack-proxy-demo/webpack.config.js)

## How to run this demo

```bash
git clone git@github.com:PsChina/Vue.git
cd /Vue/webpack/webpack-proxy-demo
npm install
# npm install webpack-cli -g # If not installed before
webpack-dev-server
```

open `https://localhost:8080`