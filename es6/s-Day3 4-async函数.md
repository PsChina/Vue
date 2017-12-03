# async函数
async函数使得异步操作更加方便
它是 Generator 函数的语法糖。

### async & await

async 相当于 Gennerator 函数的 *
await 相当于 Gennerator 函数的 yield  (await 后面通常是一个promise对象 如果不是 await会将它自动转换为一个promise对象)

它可以优化异步编程的写法

## 基本用法
```js
async function a(){

	const one = await new Promise(function(resolve,reject){

	setTimeout(function(){

        console.log('one done')
            resolve()
        },1000)

	}) 

	const two = await new Promise(function(resolve,reject){
		
	setTimeout(function(){

        console.log('two done')	
            resolve()
        },2000)

	}) 

}

a().then(function(){

	console.log('all done')
	
})
```

## Generator 函数

简单例子
```js
function* helloWorldGenerator(){  // 在 function 关键字后加*号 表示这是一个Generator 函数
    yield 'hello'; //  yield 每一个yield语句都会暂停函数的执行
    yield 'world';
    return 'ending';     
    
    /*yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
    例如 yield 1+1; 只有运行到这句yield的时候 才会计算1+1;
    */
}
/*
即该函数有三个状态：hello，world 和 return 语句（结束执行）。
*/

let generator = helloWorldGenerator();  // 程序运行到这里时 函数内部代码并不会执行

/*
调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象（Iterator Object）

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。

换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
*/

generator.next() // { value: 'hello', done: false }
generator.next() // { value: 'world', done: false }
generator.next() // { value: 'ending', done: true }
generator.next() // { value: 'undefined', done: true }

```




## demo
```js
// 例如 优化异步加载图片的代码
let loadImageAsync = (url)=>{ // 加载单张图片
    
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


async function loadImagesSync(...urlList){ //async  === * + 自动调用next()  加载多张图片
 
    urlList[0] instanceof Array ? urlList = urlList[0] : urlList = urlList ;
        
    let imageArr = [];

    for(let path of urlList){
        await loadImageAsync(path)   // => yield    // 等待第一张图片加载完成才会去加载第二张图片。 如果有n张图 那么会一张接着一张的装载 
            .then((image)=>{
    
                imageArr.push(image)

            },(error)=>{
                throw error
            })            
    }

    return imageArr // 最后当数组里面所有的图片都装载完毕会返回一个装载了所有图片的数组被返回
}
```
