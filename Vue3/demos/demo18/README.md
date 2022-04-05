# 使用 rollup 打包

rollup 一般用于代码库打包 webpack 一般用于应用代码打包

### 下载rollup

```bash
yarn add rollup --dev
```

### 配置rollup

在根目录新建 rollup.config.js 

```js
import typescript from '@rollup/plugin-typescript'
export default {
    input:'./src/index.ts', // 配置入口
    output:[ // 配置出口
        // 1. cjs -> commonjs
        // 2. esm
        {
            format:'cjs',
            file:'lib/guide-mini-vue.cjs.js'
        },
        {
            format:'es',
            file:'lib/guide-mini-vue.esm.js'
        }
    ],
    plugins:[ // 转换ts  @rollup/plugin-typescript
        typescript()
    ]
}
```

新建 src/index.ts  （mini-vue） 的出口

### 安装依赖

```bash
yarn add @rollup/plugin-typescript -D
```

添加 ts lib

```bash
yarn add tslib -D
```

### vscode 插件推荐

live server

### 配置打包命令


package.json
```json
{
    "script":{
        "build":"rollup -c rollup.config.js"
    }
}
```
-c 是为了指定编译文件

### 测试是否配置成功

```bash
yarn build
```

### 修改打包模式

tsconfig.json
```json
{
"module":"esnext"
}
```


### watch 模式

```bash
yarn build --watch
```

## Run

```bash
yarn install
```

```bash
yarn test
```


