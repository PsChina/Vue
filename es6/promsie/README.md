# promise demos

promise 中的错误处理和 promise链，以及 promsie 异步转同步的例子。

## promsie 错误处理

如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。(但是浏览器控制台会报错)

promsie 内的报错不会影响外部代码的运行 setTimeout 仍然正常运行了

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

使用 catch 能够捕获到错误并且执行 catch 内的回掉

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().catch(function(error) {

  console.log('onerror', error);

});

setTimeout(() => { console.log(123) }, 2000);
// onerror ReferenceError: x is not defined
// 123
```

## promsie 链

promise 内发的错误会被 Promise.prototype.catch 捕获。

前提是要在同一条 promsie 链。

例如用 return 返回的 promise （尾调用）。就在同一条 promise 链上

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
      setTimeout(function(){
          console.log('1秒钟')
          resolve()
      },1000)
  });
};

someAsyncThing().then(function() {
  return new Promise(function(resolve, reject){
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  })
})
.catch(function(error){

console.log(error)

})
```

浏览器报错信息：

![catch](https://github.com/PsChina/Vue/blob/master/es6/promsie/demo/images/catch.png)

而没有用 return 返回的 promise 则开启了另一个新的 promise 链。如果没有在新的链条上定义 catch 将无法 catch 到错误， 会被输出到控制台，但不影响后面的代码（setTimeout）继续执行。

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
      setTimeout(function(){
          console.log('1秒钟')
          resolve()
      },1000)
  });
};

someAsyncThing().then(function() {
  new Promise(function(resolve, reject){
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  })
    return
})
.catch(function(error){

console.log(error)

})
```

浏览器报错信息：

![catch](https://github.com/PsChina/Vue/blob/master/es6/promsie/demo/images/no-catch.png)

## 如何用 promsie 实现类似 async await 的效果(异步任务化同步)

以异步加载10张图片为例

1.定义一个用 promsie 加载图片的方法

```js
    function asyncloadImage(url){
        return new Promise(function(resolve,reject){

            const image = new Image()

            image.src = url

            image.onload = function(){
                resolve(image)
            }

            image.onerror = function(error){
                reject(error)
            }
        })
    }
```

2.每当加载完一张图片，要加载下一张图片的时候在 resove 方法内返回 加载第二张图片的 promsie 对象，如是循环到最后一张。

解决方案是 递归

```js
    function loadImageOneByOne(arr, currentIndex, resArr = []){ // 接受一个装了图片地址的数组
        const url = arr[currentIndex]
        return asyncloadImage(url).then(function(res){ // 尾调用
            resArr[currentIndex++] = res
            console.log(`Network ${url} done.`)
            // debugger
            if(currentIndex<arr.length)
            return loadImageOneByOne(arr, currentIndex, resArr) // 尾递归
        })
    }
```

[demo](https://github.com/PsChina/Vue/tree/master/es6/promsie/demo)