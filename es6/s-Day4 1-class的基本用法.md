# class

class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

## 基本用法

### 必须使用new 调用
### constructor 就是构造函数
### class 声明的变量类型是function
```js
class Point{ //声明一个类 => 点
    constructor(x,y){// 传入x,y 坐标  constrictor 等价于es5 的构造函数
        this.x = x ; //将x坐标挂载在 实例属性x上
        this.y = y ; //将y坐标挂载在 实例属性y上
    }

    toString() { // 在原型上 创建 toString 方法 也就是说所有通过 Point 类新建出来的实例 都会共享这个方法。
        return `(${this.x},${this.y})`;
    }
}

typeof Point // "function"
Point === Point.prototype.constructor // true

// 用class 定义的类 必须使用new 来调用 否则会报错 这是他与普通构造函数的区别
// 报错
var point = Point(2, 3); // 没有使用new 调用

// 正确
var point = new Point(2, 3);
```
类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

## 默认返回 this

```js
class Foo {
  constructor() {
    this.type = 'emptyClass'
  }
}

new Foo() instanceof Foo
// true


class Foo {
  constructor() {
    return Object.create(null);  // 当然你也可以返回一个 非当前类创建的对象
  }
}

new Foo() instanceof Foo
// false
```

## 不存在变量提升
类不存在变量提升（hoist），这一点与 ES5 完全不同。 (es5 函数是都具备函数声明提升的)


## this指向
类的方法内部如果含有this，它默认指向类的实例。
所以单独将方法取出类的内部来使用this指向会发生改变 很可能会报错

为了使指向不发生改变可以使用

1、
```js
class Logger {
  constructor() {
    this.printName = this.printName.bind(this); // 绑定this指向
  }

  // ...
}
```

2、
```js
class Logger {
  constructor() {
    this.printName = (name = 'there') => { // 使用箭头函数 绑定this 指向
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```

## Class 的取值函数（getter）和存值函数（setter）
```js
class myClass {
    constructor(){
        this.name = 'class'
    }
    get name(){
        console.log('即将获取name属性值')
        return this._name;
    }
    set name(name){
        if(name!=this._name){
            console.log('即将设置name属性值')
            this._name = name;
        }
    }
}

```

## 静态方法
在其他语言里面称之为类方法 与之相对的是实例方法

类方法是通过类名调用
实例方法是通过实例调用

在javascript中称之为 静态方法
static
```js

class ArrayLike{ // 类数组
    static from(){ // 静态方法 具体实现请查看下文

    }
    constructor(...args){

    }
}

```

## 如何新建含有 iterator 接口的类 类似(Array 这种能被 for of 遍历的类)

```js
    class ArrayLike {
        static fromArray(array){ // 静态方法
            if(array instanceof Array){
                return new ArrayLike(...array); 
            }else{
                return undefined;
            }
        }
        constructor(...args){
            this.args = args;
            this.index = -1;
            for(let value of args){
                this[++this.index] = value;
            }
            this.length = args.length;
        }
        *[Symbol.iterator](){ // GeneratorFunction
            for( let arg of this.args ){
                yield arg;
            }
        }
        // get length(){
        //     return this._length;
        // }
        push(value){
            this[++this.index] = value;
            this.length++;
            this.args.push(value);
            this[Symbol.iterator]();
        }
    }
```

## 私有方法和属性
```js
// 什么叫私有属性  就是只能在类内部使用的属性叫做私有属性 方法也是同样的道理

let myClass = (function(){
    let privateAttr = Symbol();
    let privateFunc = Symbol();
    class myClass{
        constructor(){
            this.name = 'myClass'; //公有属性
            this[privateAttr] = '私有属性的值' //私有属性
        }
        getPrivateAttr(){ //公有方法
            return this[privateFunc]() //调用了私有方法
        }
        [privateFunc](){ //定义私有方法
            console.log('私有方法运行了')
            return this[privateAttr];
        }
        set name(value){  // 重写setter getter 器能实现 订阅者观察者模式 
            console.log(`将要把${this.name}改成${value}`)
            this._name = value;
            console.log(`已经把${this.name}改成${value} 在这里可以发送通知 通知你想要通知的对象 告诉他你订阅的属性发生了改变`)
        }
        get name(){
            return this._name;
        }
    }

    return myClass;
})()

let my = new myClass()
```
