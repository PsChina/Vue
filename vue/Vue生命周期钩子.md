# 生命周期demo
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <!-- 这个div 就是vue的管理边界 -->
        <span v-text="msg"></span>
        <div @click="click">点我</div>
        <keep-alive>
            
            <son v-if="flag"></son>
        </keep-alive>

        <div @click="removeChild">删除子组件</div>
    </div>
    <!-- v-on -->
    <!-- @ -->

</body>
<script src="./vue.js"></script>

</html>
<script>

    Vue.component('sunzi',{
        template:'<div>孙子{{a.splice(0,1)}}</div>',
        data(){
            return{
                a:'aaa'
            }
        }
    })

    // 创建 全局组件
    Vue.component('son', {
        template: '<div>子组件 <sunzi></sunzi></div>',
        data() {
            return {
                a: 'aaaa'
            }
        },
        beforeDestroy() {
            console.log('销毁之前')
        },
        destroyed() {
            console.log('已经销毁')
        },
        activated() {
            console.log('激活')
        },
        deactivated() {
            console.log('失效')
        },
        errorCaptured(event,vm,errorType){  // 它只能捕获子组件的错误 自身的错误无法被捕获到只能被父组件捕获到
            console.log('出错了')
            if(1/*已经解决*/){
                console.log(errorType)
                return false;
            } else {
                return true;
            }
            
        }
    })

    let el = '#app'
    let vm = new Vue({
        el,
        data() {
            return { // 它 是一个容器 它下面的属性 会挂载在 Vue 实例下
                msg: 'Hello Vue!',
                flag: true
            }
        },
        methods: { // 它 是一个容器 用于存放各种方法
            click() {
                console.log('did click!')
            },
            removeChild() {
                this.flag = !this.flag;
            }
        },
        beforeCreate() {
            console.log('创建之前')
            console.log(this.msg);
            
            // debugger
        },
        created() {
            console.log('已经创建了')
            console.log(this.msg);
            this.msg = 'hello created'
        },
        beforeMount() {
            console.log('挂载之前')
            this.msg = 'Hello beforeMount'
        },
        mounted() {
            console.log('已经挂载在dom 树上了')
            this.msg = 'Hello mounted'
           
        },
        beforeUpdate() {
            console.log('更新之前')
        },
        updated() {
            console.log('已经刷新组件')
        },
        beforeDestroy() {
            console.log('销毁之前')
        },
        destroyed() {
            console.log('已经销毁')
        },
        errorCaptured(event,vm,error){ // 子组件 发生错误的时候会被调用 如果子组件 该函数 return false 就不会被父组件捕获
            console.log('error:',vm);
        }
    })
    vm.msg = 'Hello nextTick';
    console.log(vm.$el.textContent)
    // alert();
    Vue.nextTick(function(){
        console.log(vm.$el.textContent)
    })
    setTimeout(function(){
        console.log(vm.$el.textContent)
    },0)
    
</script>
```