# vue-cli 2.9.6
vue-cli 是一个帮我们自动配置 vue 项目运行环境的工具

## stpe-1 安装脚手架
全局安装
```bash
    npm i vue-cli -g
```

## stpe-2 运行脚手架并新建项目名称
新建项目
```
    vue init webpack myapp
```

## stpe-3 选择项目配置
选择配置项

### 1项目名称 myapp
### 2是否为 vue 项目 是
### 3作者 PsChina
### 4构建方式 独立构建
### 5是否使用 VueRouter 是
### 6是否使用 eslint 是 Standard 标准
### 7是否使用 unit 测试 否
### 8是否使用 e2e测试 否
### 9安装依赖的方式 手动安装

## step-4 安装依赖
```bash
    cd myapp/
    npm i
    npm run lint -- --fix
```
## step-5 运行
```bash
    npm run dev
```

# vue-cli 3.0

关于 vue-cli 3.0 配置全局变量的问题 (definPlugin不生效，因为vue-cli里面已经有一个definPlugin了)

需要如下配置
vue.config.js
```js
module.exports = {
    //...
	chainWebpack: function(config){
		config.plugin('define').tap(definitions => {
			Object.assign(definitions[0]['process.env'], {
				serverAddr: "'"+ process.env.serverAddr +"'",
			});
			return definitions;
		});
	},
    //...
}
```

不要忘记配置 [模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F)

.env.[mode]         # 只在指定的模式中被载入
