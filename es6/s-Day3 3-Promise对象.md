# Promise对象（重点）
简介： (更具体的介绍请查看 阮一峰的 <<es6入门>> )

Promise 是异步编程的一种解决方案，比传统的解决方案--回调函数和事件--更合理和强大。

promise 是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

## 三个状态

### pending（进行中）  
新建一个Promise 的时候的初始状态。
### fulfilled（已成功）
异步事件成功执行 的状态
### rejected（已失败）
异步事件失败 的状态

Promise对象的状态改变，只有两种可能：

1、从pending变为fulfilled。

2、从pending变为rejected。

只要这两种情况发生，状态就凝固了，不会再变了，这时就称为 resolved（已定型）。


## 基本用法
```js
function fn(resolve,reject){ // 如果你不知道 resolve,reject 是什么意思 就用 success,error 代替好了  //第一个参数是成功的回调函数 第二个参数是失败的回调函数 这两个函数是你自己定义的需要在下面注册 不过与下面注册的函数不完全相等 它多了改变状态的操作

    if(/*异步操作成功*/){
        resolve(result); // 成功后把结果存进去
    }else{
        reject(error); // 失败后把错误信息传过去
    }

}

const promise = new Promise(fn)

promise.then(function(result){},function(error){}) //第一个参数是成功的回调 第二个参数是失败的回调
```

## 实际案例

```js

const promise = new Promise(function(resolve,reject){
    console.log('异步操作即将开始')
    setTimeout(function(){ // 模拟 一个耗时2秒的异步操作
        resolve('信息')
    },2000)

})

promise.then(function(msg){
    console.log('异步操作完毕 接收到'+msg)
})
```

