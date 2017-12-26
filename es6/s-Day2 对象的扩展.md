#对象的扩展

## 属性的简写
```js
var a = 10;
var obj = { a }
// 对应es5
var a = 10;
var obj = { a : a };
```

## 方法的简写
```js
var obj = {
    getUp(){
        console.log(" I'm getUp ")
    }
}
obj.getUp()
// 等同于
var obj = {
    getUp:function(){
        console.log(" I'm getUp ")
    }
}
```

## 属性名表达式
在es5中 只允许用标识符定义属性

如:
```js
let a = 'b'
var obj = {
    0:'value0',
    a:'a'
}
obj['0'] // "value0"
obj['a'] // "a"
obj['b'] // undefined
```


但在es6中 允许使用表达式的方式定义属性名

```js
let a = 'b';
var obj  = {
    [a]:"i'm b"
}
console.log(obj.a,obj.b)   // undefined i'm b

let a = 'get';
let b = 'Up';
var obj = {
    [a+b](){
        console.log("i'm get up now")
    }
}
```

## Object.is()

```js
// es5 中 只有 === 和 == 他们的弊端是
// == 会隐式转换
// === 无法使得NaN 等于 NaN 以及会使得 +0 等于 -0
Object.is(+0,-0) // false
Object.is(NaN,NaN) // true
```

## Object.assign()
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
```js
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

### Object.assign 是浅拷贝的
意思是如果赋值的属性的值是一个对象那么只传递了它的指针而不是他的备份

### Object.assign 是同名属性替换的
意思是会覆盖原来已经存在的属性的属性值。

## 可枚举
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,  //值为123
//    writable: true, // 可写
//    enumerable: true, // 可枚举
//    configurable: true // 可配置 能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为true
//  }
```

## 属性的遍历6种(看es6入门)

## super 关键字
```js
    var father = {
        fn:function(){
            console.log('es5 fn')
        },
        name:'王武'
    }


    let sun = {
        getFatherName(){
            console.log(super.name);
        },
        getOwnName(){
            console.log(this.name);
        },
        name:'王麻子'
    }

    Object.setPrototypeOf(sun,father);

    sun.getOwnName();
    sun.getFatherName();
```

## 扩展运算符 ... (和 函数的扩展rest参数一样)

```js

    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }; // ...只能放在最后
    x // 1
    y // 2
    z // { a: 3, b: 4 }

//---------------------------
    let z = { a: 3, b: 4 };
    let n = { ...z }; //对于已存在的对象z ...可以不放在最后
    n // { a: 3, b: 4 }
```

## null传导运算符(提案)
安全的访问属性
```js
const firstName = message?.body?.user?.firstName  //安全
const lastName = message.body.user.lastName //不安全
```