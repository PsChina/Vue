# let 命令

let命令用来声明变量。它的用法类似于var，但是不同的地方是 所声明的变量只在let命令所在的代码快内有效。

## 块级作用域内有效 (块级作用域?见文档中部)

什么是代码块?

    用 { } 包裹起来的代码就是代码块。


例一:
```js
{
    let a = 10;
    var b = 1;
}
console.log(a); // 报错 ReferenceError: a is not defined.  引用错误  Reference 及物动词 引用的意思 
console.log(b); // 1
```

例二:
```js
var array = []
for(let i = 0 ; i < 5 ; i++){
    function fn(){
        console.log(i)
    }
    array.push(fn);
}
array[0]() // 0
array[1]() // 1
array[2]() // 2
array[3]() // 3
array[4]() // 4


var array = []
for(var i = 0 ; i < 5 ; i++){
    function fn(){
        console.log(i)
    }
    array.push(fn);
}
array[0]() // 5
array[1]() // 5
array[2]() // 5
array[3]() // 5
array[4]() // 5
```

另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
```js
 for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```
上面代码正确运行，输出了 3 次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。


## 不存在变量提升

var
```js
 console.log(foo); // 输出undefinde  
 var foo = 2;

 // foo: 
 // 有道: 函数、福 的意思。 
 // 知乎: foo还有bar都是无意义的代名词，就好像中文里面的“某某“，“张三李四”差不多。据说foo最早起源于汉字”福“。
```

let
```js
console.log(bar); // 报错ReferenceError 引用错误。 Reference是引用的意思学会了吧。
let bar = 2;

 // 由于let 不存在变量提升 所以 在控制台打印bar的时候 报了引用错误的 错。
```

## 暂时性死区 (temporal dead zone，简称 TDZ)

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
```js
var temp = 1;
{
    temp = 'a'; //  Uncaught ReferenceError 未捕获 引用错误
    let temp;
}

```
如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。


“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
```js
typeof x; // ReferenceError
let x;
```
作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。
```js
typeof x // undefined
```

有些“死区”比较隐蔽，不太容易发现。
1、
```js
function bar(x = y, y = 2) {  // 这是为函数的参数设置默认参数 属于es6 对函数的扩展 后面会讲到它。
  return [x, y];
}

bar(); // 报错 Uncaught ReferenceError: y is not defined
```
上面的代码中 参数  x = y , y = 2 相当于用let x = 实际参数||y , let y = 实际参数||2 因为逗号表达式后面let 了一个y 所以 y 在这个块级作用域形成了暂时性死区导致在y在声明之前不能使用 而 x=y 恰好在 这之前 所以 报y没有被定义的错。 

2、
另外 let x = x ; 的报错原因也是一样的
```js
let x = x // Uncaught ReferenceError: x is not defined  
// 赋值语句 的执行循序是从右到左 所以运行右边的x时 左边的let 语句还没运行 也属于 在声明前使用 也就是在暂时性死区使用。
```
ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。


## 不允许重复声明

let不允许在相同作用域内，重复声明同一个变量。
```js
//在es5 var
function fn () {
    var a =1; 
    var a =2; 
}
fn() // 不报错

/*-------------------------------- Cutting line-------------------------------- */

// es6 let

// 重名报错类型1
function fn () {
    let a =1; //使用了let 申明变量 a
    var a =2; //再次声明变量 a 导致重名 所以 运行fn()时 报错  
                // Uncaught SyntaxError: Identifier 'a' has already been declared
                //  未捕获     语法错误    标识符    ‘a’      早已     被    声明
}

function fn () {
    let a =1; //使用了let 申明变量 a
    let a =2; //再次声明变量 a 导致重名 所以 运行fn()时 报错  
                // Uncaught SyntaxError: Identifier 'a' has already been declared
                //  未捕获     语法错误    标识符    ‘a’      早已     被    声明
}

/*-------------------------------- Cutting line-------------------------------- */

// 因此 ，不能在函数内部重新声明参数。
function fn(eve){
    var eve = event; // es5 没毛病
}

function fn(eve){
    let eve = event; // 报错  'eve' has already been declared
}

function fn(eve){
    {
        let eve = event; // 不报错 因为在不同的块级作用域内可以存在相同名字的变量
    }
}
```

## 块级作用域 

ES5 只有全局作用域和函数作用域，没有块级作用域，带来很多不合理的场景。

一、内层变量覆盖外层变量。
```js
    var a = 10;
    function fn(){
        console.log(a);
        if(false){
            var a;
        }
    }
    fn(); // undefined
```

二、循环变量泄漏为全局变量。
```js
 for (var 1 = 0; i<5 ; i++){

 }
 console.log(i); // 5
```
而es6 的块级作用域的出现杜绝了这些不合理的现象

### ES6 允许块级作用域的任意嵌套。
```js

    {{{ let insane = 'Hello block scope'; }}} // 三层块级作用域

/*-------------------------------- Cutting line-------------------------------- */

    {{
        { let insane = 'Hello block scope' }
        console.log(insane) // 报错 insane 未定义
    }}

/*-------------------------------- Cutting line-------------------------------- */
// 在不同块级作用域可以定义相同变量名称。
    {{{
        {
            let a = 10;
        }
        let a = 1; 
    }}}
/*-------------------------------- Cutting line-------------------------------- */
//用块级作用域取代立即执行函数(IIFE)
{   
    let a = 10
    (function(){
        let a = 20;
    })();

}
//等价于
{
    let a = 10;
    {
        let a = 20;
    }
}
```

## 块级作用域与函数声明提升

```js
    function fn(){
        console.log('I am outside!');
    }
    (function(){
        if(false){
            function fn(){
                console.log('I am inside!');
            }
        }
        fn();
    })();
```
上面的代码在es5中 会输出 I am inside! es6 中会输出 I am outside!  但是浏览器实践时会报错 原因是为了不影响老代码的执行 es6附录允许浏览器有自己的行为方式。

但在 nodeJS 中可以演示

非严格模式下 中会 输出 I am inside! 严格模式(use strict)下 中会输出 I am outside!  

#### ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错。
```js
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}
```

## do 表达式 （提案）
块级作用域没有返回值
do 表达式 使得它有返回值
```js
    {
        let a = 1;
        a = a + 2;
    }
    // 在块级作用域之外 无法获得 a 的值 但是do表达式可以

    let x = do {
        let a = 1;
        a + 2; // 最后一行就是返回值 相当于 return a + 2;
    }
    // x = a + 2 
```
# const 命令
const声明一个只读的常量。一旦声明，常量的值就不能改变。
```js
const PI = 3.141592653

PI // 3.141592653

PI = 3 ; 
// TypeError: Assignment to constant variable. 类型错误 赋值给常量
```
所以用 const 声明的变量必须在声明时就赋值 不能在声明后初始化 

```js
    const foo;
    // SyntaxError: Missing initializer in const declaration  语法错误 在const声明中缺少初始值设定项
```
## 块级作用域内有效
```js
 {
     const bar = 'const'
 }
 console.log(bar) // bar is not defined
```
## 没有变量声明提升 && 存在暂时性死区

```js
console.log(foo) // 暂时性死区 报错 foo is not defined 
const foo = 1;
```

## 不可重复声明

```js
const a = 1;
const a = 2; //报错 Identifier 'a' has already been declared  标识符 ‘a’ 早已被声明
```

## 本质
实际上 const 保证的并不是变量的值不能改变 而是变量中存的地址不能改变

对于简单的基本类型来说 const 保证了地址不变 而 地址指向了一个根本不会变化的值，堆中的常量区，因此等同于常量，但对于符合类型来说const 只能保证地址不变 地址指向的空间存了什么东西const就管不着了

例如:
```js
    const foo = {};
    foo.name = 'zhangsan';
    console.log(foo.name) // zhangsan
    foo.name = 'lisi';
    console.log(foo.name) // lisi

    //但是 将 foo 指向另一个对象 就会报错
    foo = {} // TypeError: Assignment to constant variable. 类型错误 赋值给常量
```
如何 想让const 使得指针指向的对象也不发生改变可以使用冻结对象
```js
const foo = Object.freeze({});
// 混杂模式下 freeze对下一行无效
// 严格模式下 报错
foo.name = 'zhangsan'  // Cannot add property name, object is not extensible 不能添加属性name, 该对象是不可扩展的。

// 当然这只是一个浅度冻结 深度冻结请自学 阮一峰的 es6 入门。
```

## es6 的6中声明变量的方式

es5 中只有2种 分别是 var 和 function

es6 中 除了 var 和 function 还有

let、const

import、class （这2个后面有介绍）

共六种:

    1、var
    2、function
    3、const
    4、let
    5、import
    6、class

## 顶层对象的属性 

什么是顶层对象?

在浏览器环境 window 就是顶层对象 (但是这被视为js设计中的败笔)
在node环境中 global 是顶层对象 (因为node没有window对象)

es5 中 顶层对象的 __属性__ 与全局变量是 __等价的__

es6 中 为了挽救这个败笔 同时兼容老代码 规定 var 和 function 声明的全局变量 仍然 是顶层对象的属性
但是 let、const、import、class 声明的全局变量将不属于顶层对象的属性。

也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js
var a = 10;
console.log(window.a) // 10;    注意node 环境要写成 global.a 或者用通用写法 this.a;
let b = 20;
console.log(window.b) // undefined
```

## global 对象
在 __浏览里 顶层对象是window__ , 但Node 和Web Work 没有window (Web Work 是一种异步机制 类似于ajax 用于开启一个异步后台进程计算数据 但不允许操作dom)

浏览器和 __Web Work , self 指向顶层对象__，但是node 也没有self

__node 里的顶层对象是global__ 但是其他环境都没有global对象。

为了能使同一段代码能在各个环境都能取到顶层对象 一般用 __this__。 但那是有 __局限性__。

目前有2种方法可以勉强拿到
```js
//1
(
    typeof window !== 'undefined' ? 
    window 
    : 
    (
        typeof progress === 'object' && typeof require === 'function' && typeof global === 'object') ? 
        global 
        : 
        this
    )
        
)
//2
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

#### es6 global提案
shim 文件在实现各个环境的global对象。
```js
// CommonJS 的写法
require('system.global/shim')();

// ES6 模块的写法
import shim from 'system.global/shim'; shim();
```

















