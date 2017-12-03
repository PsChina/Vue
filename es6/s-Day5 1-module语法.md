# es6 模块化语法


## export 命令 
```js
// 在es5 中我们抛出模块一般用
module.exports
// es6 用关键字提供了一种抛出模块的写法
export

//demo
module.export {
    a:'a'
}
// 等价于
export {
    a:'a'
}
```

## import 命令
```js
//在es5中 我们引入模块一般用
require()
//es6 提供了 import 关键字
import
//demo
require('fs')
// 等价于
import 'fs'
```

## export default 
```js
// 假设模块A抛出了很多东西其中还有一个 export default
// 模块A 

function fn(){
    console.log('A')
}
let type = 'moduleA'
export fn;
export type;
export default {
    fn,
    type
}
// 模块A end

import a from 'A'

console.log(a)

/*
// {
//     fn : function (){
//             console.log('A')
//          },
//     type : 'moduleA'
// }
*/
import { type } from 'A'  // 获取模块A中抛出的type 属性
console.log(type) 
// moduleA


```

## import * as 变量名 from '模块名'

```js
// 模块A 
function fn(){
    console.log('A')
}
let type = 'moduleA'
export fn;
export type;
// 模块A end

import * as moduleA from 'A' // 会把模块A中抛出的单个属性全部挂载在 moduleA 这个变量上
console.log(moduleA) 
/*
  {
    fn:function (){
            console.log('A')
    },
    type:'moduleA'
  }
*/
```