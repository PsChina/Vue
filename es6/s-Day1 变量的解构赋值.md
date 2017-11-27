# 解构赋值
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构()

## 数组的解构赋值

以前，为变量赋值，只能直接指定。
```js
let a = 1;
let b = 2;
let c = 3;
```
ES6 允许写成下面那样
```js
let [a,b,c] = [1,2,3];
//<<es6入门>>有更深的案例 但这个简单的案例学会了稍加动脑就能学会 嵌套解构
```
### 解构不成功
如果解构不成功，变量的值就等于undefined
```js
//1
let [foo] = [];
console.log(foo)  // => undefined

//2
let [bar,foo] = [1];
console.log(bar,foo) // => 1 undefined

```

### 不完全解构
```js
let [x,y] = [1,2,3];
console.log(x,y) // => 1 2

let [a,[b],d] = [1,[2,3],4];
console.log(a,b,d) // => 1 2 4;
``` 

### 无法解构
```js
let [foo] = 1; //报错
```
除了数字 还有布尔值 NaN undefined null {} 都是无法用 __数组__ 解构的

因为他们都没有 __索引_  也就是没有(Iterator)接口


对于有 Iterator 接口的对象是可以用 数组解构的

例一、
```js
    let [x,y,z] = new Set(['a','b','c']); // set 是一个集合 如果存入相同的元素他会自动去重
    x // => a
```

例二、
```js
    let [a,b,c] = '123';
    b // => 2
```

### 默认值
```js
let [foo = 'default'] = [];
console.log(foo) // => 'default'
/*----------------------------*/
let [foo = 'default'] = ['123'];
console.log(foo) // => '123'
```

es6 内部使用全等运算符 (===) 如果数组成员不严格等于 undefined 默认值不会生效

例如:
```js
let [x = 1] = [undefined]
console.log(x) // => 1
//-------------------------------
let [x = 1] = [null]
console.log(x) // => null
```

#### 默认值的惰性求值
默认变量的值是惰性计算的 也就是说在实际参数不等于undefined的情况下 不会计算默认参数的值

例如:
```js
function defaultValue(){
    console.log('default value is 1')
    return 1;
}
let [ x = defaultValue() ] = [1];
//控制台不会输出 default value is 1 意味着没有计算defaultValue
```

#### 默认值必须提前声明

```js
    let [x = y] = []; // y is not defined

//  ----------------------------
    let y = 4;
    let [x = y] = [];
    console.log(x) // => 4
```

## 对象的解构赋值

解构不仅可以用于数组，还可以用于对象。

```js
let { name, age } = { age: 18, name:"张三" }
console.log( name, age ); // => 张三 18
```
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值，否则解构失败。

### 解构失败
```js
let { abc } = { a: '1', b: '2' } 
console.log(abc) // => undefined
```

### 自定义变量名
```js
let { first:f } = { first: 'Hello', last: 'es6!' } //未完全解构
console.log(f) // => 'Hello'
console.log(first) // => 报错 first is undefined  

//--------------------------------------------------------------------------------------

// 事实上(actually)
let { name } = { name: 'lisi' } //等价于 let { name: name } = { name: 'lisi' }
```
上面代码中，first是匹配的模式，f才是变量。真正被赋值的是变量f，而不是模式first。

### 嵌套解构
与数组一样，解构也可以用于嵌套结构的对象。
```js
    let obj = {
        key:[
            'Hello',
            { y: 'es6!' }
        ]
    };

    let { key: [x , { y }] } = obj;

    console.log(x) // => 'Hello'
    console.log(y) // => 'es6'
    console.log(key) // => 报错 key is undefined

//----------------------------------------------------------

    let { key: [x , { y }] , key: key }

    console.log(x) // => 'Hello'
    console.log(y) // => 'es6'
    conosle.log(key) // => ["Hello", {y: "es6!"}]

//简写

    let { key: [x, { y }] , key } = obj;

```

### 默认值
```js
var { x = 3 } = {};
console.log(x) // => 3

let { y:value = 1 } = {x: 10};
console.log(value) // => 1

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"

```
默认值生效的条件是，对象的属性值严格等于undefined。

### 特殊对象=>数组
```js
let arr = ['first','middle','last'];
let { 0 : first, [arr.length-1] : last } = arr
first // first
last // last
```

## 字符串的解构赋值
字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
```js
const [a,b,c] = 'ES6';

a // E
b // S
c // 6



//类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let {length: len} = 'Hi';
len // 2
```

## 数值布尔值的解构赋值
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
```js
 let {toString: fn} = 123;
 fn === Number.prototype.toString // true

 let {toString: fn} = true;
 fn === Boolean.prototype.toString // true
```
上面代码中，数值和布尔值的包装对象都有toString属性，因此变量fn都能取到值

## 无法解构
```js
let { property: x } = undefined; // TypeError property这个模式写成任何属性都无法解构
let { property: y } = null; // TypeError
```

## 函数参数的解构赋值
```js
    function fn([x,y]){
        return x + y;
    }
    fn([1,2]) // 3

    function fn([x = 1,y = 2]){
        return x + y;
    }
    fn([undefined,undefined]) // 3
    fn([0,0]) // 0
```

## 用途(请参考es6入门)

### （1）交换变量的值

### （2）从函数返回多个值

### （3）函数参数的定义

### （4）提取 JSON 数据

### （5）函数参数的默认值

### （6）遍历 Map 结构

### （7）输入模块的指定方法







