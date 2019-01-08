# promise 链

promise 内发的错误会被 Promise.prototype.catch 捕获。

前提是要在同一条 promsie 链。

例如用 return 返回的 promise （尾调用）。就在同一条 promise 链上

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
}).catch(function(error){

console.log(error)

})

setTimeout(() => { console.log(123) }, 2000);
```

浏览器报错信息：

![catch](https://github.com/PsChina/Vue/blob/master/es6/promsie/demo/images/catch.png)

而没有用 return 返回的 promise 则开启了另一个新的 promise 链。如果没有在新的链条上定义 catch 将无法 catch 到错误， 会被输出到控制台，但不影响后面的代码（setTimeout）继续执行。

```js
const someAsyncThing = function() {
    new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x + 2);
    });

    return new Promise(function(){

        // 什么都不做

    })
};

someAsyncThing().then(function() {
  console.log('everything is great');
}).catch(function(error){

console.log(error)

})

setTimeout(() => { console.log(123) }, 2000);
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