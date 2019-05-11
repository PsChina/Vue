1. [webpack 简介](#webpack-简介)
1. [前提](#前提)
1. [配置文件](#配置文件)

# webpack 简介

webpack 是出现在 gulp 之后的一个更加方便的自动化构建工具。

它比配置gulp所需花费的时间要少。

## 前提
1、使用webpack必须安装 [node](https://nodejs.org/en/)

2、必须全局安装 webpack

```bash
npm i webpack -g
```

局部如果用到 webpack 则需局部安装：

```bash
npm i webpack -D
```

3、webpack4.0 必须全局安装 webpack-cli

```bash
npm i webpack-cli -g
```

最好局部也安装一下

```bash
npm i webpack -D
```

4、本地启动服务的包 webpack-dev-server （运行项目所必须）

```bash
npm i webpack-dev-server -g
```



## 配置文件

webpack.config.js 是 webpack 默认的配置文件。

以上的教程指的是 webpack.config.js 内的代码。