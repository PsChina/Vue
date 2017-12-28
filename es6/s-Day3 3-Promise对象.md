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

只要这两种情况发生，状态就凝固了，不会再变了，这时就称为 resolved （__已定型__）。


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
## promise的实例方法

### then
 第一个参数是 成功的回调， 第二个参数是 失败的回调。
 用于注册 resolve 和 reject 的 __子函数__ 。 

 也就是说 
 promise调用resolve的时候会调用then里面成功的回调。
 promise调用reject 的时候会调用then里面失败的回调。

### catch
 Promise.prototype.catch方法是.then(null, rejection)的别名。 (用于捕捉错误)

### done
Promise 对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为 Promise 内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。

## promise的静态方法

### reject
  将非promise 对象转换为promise对象 状态为rejected
  用法
```js
Promise.reject('hello'); // 用构造函数调用 而不是实例
// 将一个hello 转换为promise对象

new Promise((resolve,reject)=>{
    reject('hello')
})
```
### resolve
 将非promise 对象转换为promise对象 状态为 resolved
 用法 
```js
Promise.resolve('hello'); // 用构造函数调用 而不是实例
// 将一个hello 转换为promise对象

//上面的代码等价于
new Promise((resolve)=>{
    resolve('hello')
})
```

### all
用于将 __多个__ promise实例包装成 __一个新的__ promise实例。

 1、它可以接收多个对象 就算对象不是promise对象。

 2、如果对象不是promise他会把这个对象 用Promise.resolve 转换成promise对象。

 3、如果所有的promise对象状态都为fulfilled 那么新的promise对象也会成为fulfilled状态。

 4、只要有一个对象是rejected状态那么新的promise对象就会变成rejected状态。

### race
用于将 __多个__ promise实例包装成 __一个新的__ promise实例。

 1、它可以接收多个对象 就算对象不是promise对象。

 2、如果对象不是promise他会把这个对象 用Promise.resolve 转换成promise对象。

 3、在所有的参数中最先成功或者失败的对象的状态会被 race 产生的新promise跟随，不管其他后完成的promise是个什么样子。

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

## demo1
```js
//封装ajax

const ajax = function(obj){

    const request = new XMLHttpRequest(); // ActiveXObject('Microsoft.XMLHTTP') 只存在于IE6 IE5 然而这两种浏览器已经没人用了。

    request.open(obj['method'],obj['url']);

    const promise = new Promise((resolve,reject)=>{
        request.onreadystatechange = function(){
            if(this.readyState !== 4){
                return
            }
            if(this.status == 200 ){
                resolve(this.response);
            }else {
                reject(this.responseText);
            }
        }
    });
    
    request.send(obj['data']);

    return promise;
}
```

## demo2
```js
let loadImageAsync = (url)=>{
    
    return new Promise((resolve,reject)=>{

        const image = new Image()

        image.onload = () => {
            resolve(image);
        }

        image.onerror = () => {
            reject(new Error('Can not load image at' + url))
        }

        image.src = url;

    })
    
}

let loadImagesAsync = (...list)=>{ // 加载多张图片

    if(list[0] instanceof Array){ // 支持传入数组参数
        list = list[0] 
    } 

    return new Promise((resolve,reject)=>{

        let [imageCount,imageArr] = [list.length,[]];
        
            list.forEach((value,index,arr)=>{

                loadImageAsync(value)
                .then((image)=>{
                    imageArr.push(image);
                    if(imageArr.length == imageCount){ // 当所有图片加载完成再进行 resolve
                        resolve(imageArr);
                    }
                },(error)=>{ // 只要一张图片加载失败就 执行 reject
                    reject(error);
                })
            })

    })


}
```

