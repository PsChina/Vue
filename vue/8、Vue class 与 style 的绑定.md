## 绑定class

### 对象语法

```html
    <style>
        .bg{
            background:red
        }
        .color{
            color:orange
        }
    </style>
    <div v-bind:class="{ bg:false,color:true }">
       Hello v-bind:class
    </div>
     <!-- 对象用法 key名必须是已经存在的 classname 值为true就生效 false 不生效 -->

     <!-- true 和 false 可以换成 data里面的属性 -->
```
以上代码会显示一个 背景色为默认颜色 字体颜色为orange 的 Hello v-bind:class 字样

### 数组语法

```html
    <style>
        .bg{
            background:red
        }
        .color{
            color:orange
        }
    </style>
    <div v-bind:class="['bg','color']">
       Hello v-bind:class
    </div>
     <!-- 这里数组的值写的是字符串 你也可以写data里的变量 -->
```

### 组件语法
```html
<html>
    <style>
        .bg{
            background:red
        }
        .color{
            color:orange
        }
    </style>    
    <son v-bind:class="[classA,{color:ok}]" v-bind:msg="msg"></son>
</html>
<script>
    Vue.component('son',{
        template:'<div>{{msg}}</div>',
        props:['msg']
    })
    new Vue({
        el:'#app',
        data(){
            return {
                msg:'Hello',
                classA:'bg',
                ok:true
            }
        }
    })
</script>
```

## 绑定style

### 对象语法

```html
    <div :style='{background:"red"}'>123</div>
```

### 数组语法
```html
<html>
    <div id="app" :style="[obj1,obj2]">123</div>
</html>
<script>
     new Vue({
        el:'#app',
        data(){
            return {
                obj1:{color:"red"},
                obj2:{background:'green'},
            }
        }
    })   
</script>
```

### 自动添加前缀

:style 会自动添加css前缀

比如user-select:none

在谷歌显示的是 user-select:none

在火狐显示的是 -moz-user-select: none

### 多重值
:style 支持数组 多重值 会选择 最后一个浏览器支持的值为最后的结果
```html
<div :style="{display:['-webkit-box', '-ms-flexbox', 'flex']}">123</div>
```
