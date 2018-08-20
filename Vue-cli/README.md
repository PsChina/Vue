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

