# @decorator 装饰器

@decorator 装饰器是 es7 更新的提案。需要搭建运行环境 [传送门](https://github.com/PsChina/Vue/blob/master/webpack/webpack-decorator.md)

## 装饰器的主要用途 

1. 装饰类   
1. 装饰属性 


装饰类的写法    
```js
@FooDecorator
class Foo {

}

function FooDecorator(target){
    // target 就是这个 class 的原型对象
}
```

装饰属性的写法

```js
class Bar {
    @attrDecorator
    attr(){

    }
}

function attrDecorator(target,name,discriptor){
    // target 就是这个 class 的原型对象
    // name 就是 要装饰的属性名 attr
    // discriptor 是这个被装饰属性的描述项 
    /*  
        {
            configurable: true
            zenumerable: false
            value: ƒ attr()
            writable: false
        }   
    */
    return discriptor
```

## 装饰类

下面的装饰器给 `MyClass` 这个类添加了一个静态方法 `isMyClass` 用于判断一个实例是否属于该类或该类的派生类。 

以及给 `MyClass` 的所有实例添加了一个共享属性 `author`
```js
@MyClassDecorator
class MyClass {
	constructor(){
	}
}

function MyClassDecorator(target){
	target.isMyClass = function(val){
        return val instanceof target
    }
	target.prototype.author = 'PsChina'
}
```

## 装饰属性

下面的装饰器给 `MyClass` 的所有实例的 `getType` 属性设置为仅为可读不可更改的属性 `readonly`。

```js
class MyClass {
	constructor(){
		this.type="myClass"
	}
	@readonly
	getType(){
		return this.type
	}
}

function readonly(target, key, discriptor){
	discriptor.writable = false
	return discriptor
}
```

## 多个装饰器

下面的代码给 getType 这个函数使用了两个装饰器 `readonly` 和 `logHello`

`readonly` 这个装饰器使得 getType 不可更改。

`logHello` 这个装饰器会使得每次调用 getType 这个函数时会先在控制台输出 hello 。

```js
class MyClass {
	constructor(){
		this.type="myClass"
	}
	@readonly
	@logHello
	getType(){
		return this.type
	}
}

function readonly(target, key, discriptor){
	discriptor.writable = false
	return discriptor
}

function logHello(target, key, discriptor){
    const oldFn = target[key]
    target[key] = function(...rest){
        console.log('Hello')
        return oldFn.call(this,...rest)
    }
    return target
}
```

[demo](https://github.com/PsChina/Vue/tree/master/es6/decorator-demo/)

(完)