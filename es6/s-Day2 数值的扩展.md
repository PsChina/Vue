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
    function numberIsEquel(a,b){
        return Math.abs(a - b) < Number.EPSILON * Math.pow(2,2);
    }
```

## 安全整数 和 Number.isSafeInterger()

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




