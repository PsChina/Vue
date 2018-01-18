## slot
slot 用与解决 被 vue 组件 包裹起来的元素 被吃掉的问题

### 抛出问题

```html
<html>
    <div id="app">
        <item>
            <div>头部</div>
            <div>脚部</div>
        </item>
    </div>
</html>
<script>
    Vue.component('item',{
        template:'<div>组件</div>'
    })
    new Vue({
        el:'#app'
    })
</script>
```
以上代码 的 头部 和 脚部 文字 会被 组件 item 吃掉 不见


### slot 解决

```html
<html lang="en">
<body>
    <div id="app">
        <item> 
            <div slot="title">头部</div>   
            <div slot="footer">脚部</div> 
        </item>
    </div>
</body>
</html>
<script>
    Vue.component('item',{
        template:`<div>  
                    <slot name="title"></slot>
                     组件   
                     <slot name="footer"></slot>    
                  </div>`
    })

    new Vue({
        el:'#app'
    })

</script>
```