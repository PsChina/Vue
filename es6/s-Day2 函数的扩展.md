# 函数的扩展

## 函数的默认值


ES5
```js
function fn( x , y ){
    y = y || 'default'
    console.log(x,y)
}

fn(1) // 1 default
fn(1,2) // 1 2

// 缺点 
fn(1,false) // 1 default   其实 理论上应该是 1 false
```

ES6 对函数默认值的改进

```js
function fn( x , y = 'default' ){
    console.log(x,y)
}

fn(1)  // 1 default
fn(1,2)// 1 2
fn(1,false) //1 false  
```

### 同名参数报错

```js
    function fn(x,x,y) {  // 不报错  默认es5

    }
    function fn(x,x,y = 1){  // 报错 es6 写法使得前面的 语法都是es6 x 重名

    }
```
### 默认值是惰性求值 (这个之前讲过 提一下 没有demo)


## rest 参数

```js
    function fn(...params){
        console.log(params)
    }
    fn(1,2,3) // [1,2,3]

    function fn([a,b,...other]){
        console.log(a,b,other)
    }
    fn([1,2,3,4,5])  // 1 , 2 , [3,4,5]

    // ... 还可以对 对象进行解构    ...paramName 也就是 rest 参数

    function fn({x,y, ...other}){
        console.log(x,y,other)
    }
    fn({x:24,a:1,z:26}) // 24 undefined {a:1,z:26}

```

### 注意 rest 参数只能放在最后 否则报错

```js
    function fn([first,...other,last]){ //Uncaught SyntaxError: Rest element must be last element

    }
    fn([1,2,3,4])
```

## 函数的length 属性(自学)

## es6 在函数内使用严格模式会报错

## es6标准中 可函数对象本身的name 属性获取函数名

如匿名函数
```js
(function(){}).name // ''

var f = function(){}
//es5 
f.name // ''
//es6
f.name // 'f'

var f = function fn(){}
//es6
f.name // 'fn'
```

## 箭头函数

### 基本用法
```js
var f = a => a+1
// 等价于
var f = function(a){
    return a+1;
}
```

### 多个参数
多个参数 需要用 原括号() 将参数抱起来 以及逗号表达式,分割
```js
var f = (a,b) => a + b ;

```

### 多条语句
多条语句需要 用花括号{} 将函数体包起来
```js
var f = () => { console.log('语句A') ; console.log('语句B') }
```

### 直接返回对像
直接返回对象 也就是说 不用括号{} 包起函数的情况下直接返回一个对象即
```js
    var f = a => return {}; //报错  
    var f = a => { return {} } // 不报错
```

### 直接绑定this 对象
意思是 在箭头函数内部 this对象不是根据运行时的上下文来确定的 而是 __定义时所以在对象__ 的this 
```js
    var obj = {
        name:'zhangsan',
        fn:()=>{
            console.log(this.name)  
        }
    }
    obj.fn() // undefine
```
将它理解为 指向丢失就好了。

### 不可以使用arguments对象 但是可以使用 ...arg (rest参数)

### 不可以使用yield命令 
也就是说不能用 箭头函数来作 Generator 函数 (状态机)

### 不能使用new来调用箭头函数
也就是说不能用箭头函数来定义构造函数


## 双冒号运算符  (提案)
可以用来绑定this 指向
```js
var obj = {
        name:'zhangsan'
    }

function logName(){
    console.log(this.name)
}

obj::logName;
logName() // zhangsan
```

### 尾调用优化
在一个函数结束时调用另一个函数 不做其他的任何事情 就是一个 尾调用。
```js
//我们可以举斐波那契数列的例子
```