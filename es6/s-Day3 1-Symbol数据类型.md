# Symbol

JavaScript 语言的第七种数据类型。


前六种是：

undefined、

null、

布尔值（Boolean）、

字符串（String）、

数值（Number）、

对象（Object）。


## 如何新建Symbol

```js
let symbol  = Symbol();
```

## 意义
他用来生成一个独一无二的值 也就是每次新建出来的值 都不会与任何其他的值相等 除了他本身

```js
    let a = Symbol()
    a === a // true;

    Symbol() == Symbol() //false

//----------------------------------
    typeof a
    // "symbol"
```

## 不能与其他数据类型进行计算

```js
//Symbol 值不能与其他类型的值进行运算，会报错。
Symbol() + 1 // Uncaught TypeError: Cannot convert a Symbol value to a number
```