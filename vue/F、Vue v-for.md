## v-for

### 迭代对象

```html
<html>
    <div id="app">
        <div v-for="(value,key) in obj">
            <span>{{key}}</span>:<span>{{value}}</span>
        </div>
    </div>
</html>
<script>
    new Vue({
        el:'#app',
        data:{
            obj:{
                key1:'value1',
                key2:'value2'
            }
        }
    })
</script>
```


### 迭代数组

```html
<html>
    <div id="app">
        <div v-for="(value,index) in array">
            <span>{{index}}</span>:<span>{{value}}</span>
        </div>
    </div>
</html>
<script>
    new Vue({
        el:'#app',
        data:{
            array:['苹果','梨子','香蕉']
        }
    })
</script>
```

### 迭代整数

```html
<html>
    <div id="app">
        <div v-for="(value,index) in 5">
            <span>{{index}}</span>:<span>{{value}}</span>
        </div>
    </div>
</html>
```

### 迭代组件
```html
<html>
    <div id="app">
        <item v-for="(val,index) in array" :value="val">   <!-- 将遍历出来的值val 传递给 item 的value props属性 -->
          
        </item>
    </div>    
</html>
<script>
    Vue.component('item',{ 
        props:['value'], // 接收父组件传递的值
        template:'<div v-text="value"></div>'
    })
    new Vue({
        el:'#app',
        data:{
            array:['苹果','梨子','香蕉']
        }
    })    
</script>
```
### 特殊属性 key

用于区分不同的dom元素需要用到 key 属性 所以key 属性应当给一个不重复的唯一值

v-for 会智能的重用之前传染出来的dom元素来减少性能消耗

但是这导致无法触发完整的声明周期函数 

如果想要完整的生命周期 可以改变key 里面存储的值来达到彻底刷新dom的效果

```html
    <div v-for="(value,index) in array" :key="index">
        <span>{{value}}</span>
    </div>
```

### 变异方法与非变异方法

变异方法指的是用该方法改变数组的值时Vue能响应式的更新UI，

非变异方法与上面的效果相反。

变异方法有:

push()

pop()

shift()

unshift()

splice()

sort()

reverse()


非变异方法 总是返回新数组 

例如：

filter(), concat() 和 slice()

### demo

```html
<html>
    <div id="app">
        <div v-for="value in array"> {{ value }} </div>
        <div @click="changeArrayValue">非变异</div>
        <div @click="changeValue">变异方法</div>
    </div>    
</html>
<script> 
    new Vue({
        el:'#app',
        data:{
            msg:'Hello v-for'
        },
        methods:{
            changeArrayValue(){
                this.array[0] = 10000;
                console.log(this.array)
            },
            changeValue(){
                this.array.splice(0,1,10000);
                console.log(this.array)
            }
        }
    })
</script>
```
   