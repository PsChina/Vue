# ES7 语法 @decorator webpack 环境配置

在 bash 命令行运行
```bash
yarn add babel-loader --dev
yarn add @babel/core --dev
yaen add @babel/preset-env -dev

#yarn global add @babel/plugin-proposal-decorators --dev
#yarn global add webpack-cli --dev
#yarn global add webpack-dev-server -dev
```

在 webpack.config.js 配置好

```js
module.exports = function(){
	return {
		module: {
			rules: [
				{test: /\.js$/,use:['babel-loader']}
			]
		}
}
```
 
在 package.json 或者 .bablerc 配置好

```json
  "babel": {
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ],
    "presets": [
      "@babel/preset-env"
    ]
  }
```