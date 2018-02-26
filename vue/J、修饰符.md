# 修饰符
Vuejs 修饰符有 3 类 事件修饰符 按键修饰符 表单修饰符

## 事件修饰符

 stop 阻止冒泡 相当于帮你调用了 
```js
    event.stopPropagation()
```
 prevent 阻止默认事件  相当于 帮你调用了 
```js
    event.preventDefault()
```
 capture 阻止捕获  相当于帮你调用了 
```js
    ele.addEventListener(eventName,fn,{capture:true});
```

 self 只能是点击元素本身的时候触发事件 相当与调用了 
```js 
    if(event.target === element){ 
        fn() 
    };
```

 once 该事件只能触发一次 
```js
    function vessel(){
        if(vessel.isFirstClick){ 
            fn() vessel.isFirstClick=false 
        };  
    }  
    vessel.isFirstClick=true;
```
 passive 修饰符尤其能够提升移动端的性能。

 ```js
    ele.addEventListener(eventName,fn,{passive:true});
 ```

 ## 按键修饰符
 使用修饰符后只有在 按下相应的按键的情况下才会触发事件
```js
/*
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right 

.ctrl
.alt
.shift
.meta 

.exact
 
//鼠标按键
.left
.right
.middle
```

## 表单修饰符
    用于表单元素
```js
// 1 number  将用户输入的 数字字符串 转换为数字
// 2 lazy 将input 框中的数据改变在 change事件中进行 而不是实时的
// 3 trim  消除 input 框内容首尾空格的。
```
