## computed 的set get 方法

当计算属性被设置值和获取值的时候会触发set 和 get 方法

```js
    const vm =new Vue({
        el:'#app',
        data(){
            return {
                msg:'Hello'
            }
        },
        computed:{
            message:{
                set(val){
                    this.msg = val+'last';
                },
                get(){
                    return this.msg.toUpperCase()
                }
            }
        }
    })

    vm.message = '123'  //=> '123last'
    vm.message // => 123LAST
```

