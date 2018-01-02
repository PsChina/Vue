## computed
computed 计算属性

计算属性 就是将 data/props 里面的数据进行进一步的加工 返回新的数据 这里只介绍 对 data 的计算

以下这个例子中 计算属性sum 的结果是 data 属性 a 和 b 的和。

也就是说当 this.a 或者 this.b 任何一个发生改变的时候 sum 会相应的被更新 

如果 a 或者 b 的值被修改的时候 值不变那么将不会触发 求和计算 因为 求出来的结果和上次一样 

```html
<html>
    <div id="app">
        <input v-model.number="a" />
        <input v-model.number="b" />
        <div v-text="sum"></div>
    </div>
</html>
<script>
const vm = new Vue({
    el:'#app',
    data:{
        a:0,
        b:0
    },
    computed:{
        sum(){
            console.log('Computed sum did run!')
            return this.a+this.b;
        }
    }
})
</script>
```
计算属性是一对一 或 多对一的 (一次可以计算一个属性 也可以计算多个属性 上文中 sum 计算了 a,b 两个属性)



## watch 
watch 用于监听 data 属性的变化。 __一旦data的属性被设置watch就会工作__

以下例子中

当 a 或者 b 一旦被赋值 不论是否和上次的值一样 都会触发求和计算。
```html
<html>
    <div id="app">
        <input v-model.number="a" />
        <input v-model.number="b" />
        <div v-text="sum"></div>
    </div>
</html>
<script>
const vm = new Vue({
    el:'#app',
    data:{
        a:0,
        b:0,
        sum:0
    },
    watch:{
        a(val){
            console.log('attribute a value did set!')
            this.sum = this.b + val
        },
        b(val){
            console.log('attribute b value did set!')
            this.sum = this.a + val
        }
    }
})
</script>
```
watch 是一对一 或者一对多的  (一次只能watch 一个属性  由data的属性只能通过属性名监听决定的)


## method

由于Vue 是响应式的 所以 下文中的 data中的属性 a 或者 b 一旦被赋值 methods 中的 sum 属性都将重新被计算不论结果是否与上次一致。
```html
<html>
    <div id="app">
        <input v-model.number="a" />
        <input v-model.number="b" />
        <div v-text="sum"></div>
    </div>
</html>
<script>
const vm = new Vue({
    el:'#app',
    data:{
        a:0,
        b:0
    },
    methods:{
        sum(){
            console.log('method sum did run!')
            return this.a + this.b;
        }
    }
})
</script>
```
