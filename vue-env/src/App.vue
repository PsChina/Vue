<template>
    <div>
        compoent {{msg}}
        <mycomponent/>
    </div>
</template>

<script>
import Vue from 'vue'
import mycomponent from './component.vue'
class A{
    @before // 测试 装饰器
    log(...rest){
        console.log('hello',...rest)
    }
}
function before(target,name,discriptor){
    const originFn = target[name]
    target[name] = function(...rest){
        console.log('wll say Hello')
        originFn.call(this,...rest)
    }
    return target
}
export default Vue.extend({
    components:{
        mycomponent
    },
    data(){
        const a = {a:'a',b:'b'}

        const b = {...a} // 测试 对象展开式
        return {
            msg:b
        }
    },
    methods: {
        async func(){
            await new Promise((reslove,reject)=>{
                setTimeout(()=>{
                    this.msg = '第一个三秒'
                    reslove()
                },3000)
            })
            await new Promise((reslove,reject)=>{ // 测试 async/await
                setTimeout(()=>{
                    this.msg = '第二个三秒'
                    new A().log('哈哈')
                    reslove()
                },3000)
            })
        },
        sayHello(){
        }
    },
    mounted(){
        this.func()
    }
})
</script>

<style>

</style>
