# 数值的扩展

## 二进制和八进制表示法
```js
//0b 、0B 二进制
//0o 、0O 八进制
//0x 、0X 十六进制
0b010 === 2 // true
0o010 === 8 // true
0x010 === 16 // true
```
## 指数运算符 **
```js
2**3 == Math.pow(2,3); // true
```

## Number.isFinite(), Number.isNaN()

Finite 有限的
NaN 非数值  ( 1 '1' 都属于数值)
### Number.isFinite
```js
//Number.isFinite 是一个判断数值是否有限的方法
Number.isFinite(3) // true 有限
Number.isFinite(1/3) // true 有限 说明1/3有限大 不是指小数属否有限
Number.isFinite(NaN) //false 
Number.isFinite(Infinity) // false Infinity 正无穷
Number.isFinite(-Infinity) // false -Infinity 负无穷
Number.isFinite('3') // false
Number.isFinite('foo') //false
Number.isFinite(true) // false
```
### Number.isNaN()
```js
Number.isNaN(NaN) // true
Number.isNaN(0) // false 其他非NaN一律false 
```

## Number.parseInt(), Number.parseFloat()
将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。 (也就是各自分工干各自的事 单一职责原则)

## Number.isInteger()
判断一个数字是否为整数 （字符串除外）
```js
Number.isInteger(1); //true
Number.isInteger('1') //false
```

## Number.EPSILON
```js
Number.EPSILON === Math.pow(2, -52) 
// Number.EPSILON表示js能表示的最小的浮点数 即2的 -52次方
```

Number.EPSILON可以用来设置“能够接受的误差范围”。

比如，误差范围设为 2 的-50 次方（即Number.EPSILON * Math.pow(2, 2)），即如果两个浮点数的差小于这个值，我们就认为这两个浮点数相等。

```js
    function numberIsEqual(a,b){
        return Math.abs(a - b) < Number.EPSILON * Math.pow(2,2);
    }
```

## 安全整数 和 Number.isSafeInteger()

JavaScript 能够准确表示的 __整数__ 范围 在 -2^53 到 +2^53 不包含2端 超过这个范围无法精确表示。

```js
Math.pow(2,53) === Math.pow(2,53)+1

//ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

Number.isSafeInterger() //用来判断一个 __整数__ 是否落在这个范围之内
```

## Math 对象的扩展


### Math.trunc()
去除小数部分
```js
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
```

### Math.sign()
用于判断一个数到底是正数、负数、还是零 还是非数值
```js
Math.sign(-5) // -1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN
Math.sign('9')  // +1
Math.sign('foo')  // NaN
```

### Math.cbrt()
计算立方根
```js
Math.cbrt('8') // 2
Math.cbrt('hello') // NaN
```

## Math.clz32()
计算这个数字用01表示时有多少个无意义的0
```js
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1000) // 22
Math.clz32(1<<1) // 30
//对于小数，Math.clz32方法只考虑整数部分。
Math.clz32(3.2) // 30
```
## Math.imul() 
计算结果超精度是能正确返回值

## Math.fround()
Math.fround 方法返回一个数的单精度浮点数形式。
```js
Math.fround(1.337) // 1.3370000123977661
```

## Math.hypot()
计算返回所有参数的平方和的算术平方根
```js
Math.hypot(3, 4);        // 5  勾股定理
Math.hypot(3, 4, 5);     // 7.0710678118654755
```

## 对数方法4个(请查看es6入门)

## Math.signbit()  (提案)
Math.sign()用来判断一个值的正负，但是如果参数是-0，它会返回-0。

Math.signbit() 用于判断是否设置了符号。

## Integer 数据类型 (提案)
在数字后边加n 来表示整型数据
```js
1n //十进制
0b1101n // 二进制
0o777n // 八进制
0xFFn // 十六进制


1n + 2n // 3n

typeof 123n
// 'integer'


1n + 1 //隐式转换 报错
// 报错



// 相等运算符（==）会改变数据类型，也是不允许混合使用。
0n == 0
// 报错 TypeError

0n == false
// 报错 TypeError

//精确相等运算符（===）不会改变数据类型，因此可以混合使用。
0n === 0
// false
```
