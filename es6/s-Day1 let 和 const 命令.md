# let 命令

let命令用来声明变量。它的用法类似于var，但是不同的地方是 所声明的变量只在let命令所在的代码快内有效。

## 块级作用域 (见文档中部)

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

    {{{ let insane = 'Hello block scope'; }}}

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

```






