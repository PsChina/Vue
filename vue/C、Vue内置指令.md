# vue内置指令

## v-text
    效果于 {{}} 相同 优点是当页面加载慢的时候不会出现{{}}

### 用法
```html
<!-- msg 的值为 hello -->
<div v-text="msg"></div>   <!-- => hello -->
```

## v-html
    能在data 里写 字符串模版 通过v-html 显示

### 用法
```html
<!-- data:{dom:"<div>div</div>"} -->
<div v-html="dom"></div> <!-- => div -->
```

## v-bind
    能绑定原生dom 属性和 自定义属性

### 用法
```html
    <!-- 1、绑定class -->
    <style>
        .bg{
            background:red
        }
    </style>
    <div id="app" v-bind:class="myclass">红色背景</div>
    <script>
        new Vue({
            el:'#app',
            data(){
                return{
                    myclass:'bg'
                }
            }
        })
    </script>

    <!-- 2、绑定style -->
    <div id="app" v-bind:style="{ background:'orange', color:'pink'}">{{text}}</div>
    <script>
        new Vue({
            el:'#app',
            data(){
                return{
                    text:'bind style'
                }
            }
        })
    </script>

    <!-- 3、绑定href -->
    <div id="app">
    <a  v-bind:href="url">百度</a>
    </div>
    <script>
        new Vue({
            el:'#app',
            data(){
                return{
                    url:'http://www.baidu.com'
                }
            }
        })
    </script>

    <!-- 4、绑定src -->
    <div id="app">
    <img  v-bind:src="path"/>
    </div>
    <script>
        new Vue({
            el:'#app',
            data(){
                return{
                    path:'./img/logo.png'
                }
            }
        })
    </script>
    <!-- 等等 -->

```

### 简写 :
    v-bind 的简写是 :
```html
    <div id="app" :class="myclass">{{myclass}}</div>
```

## v-on
    v-on 用于绑定事件
### 用法
```html
    <div id="app" v-on:click="click">点击按钮</div>
    <script>
        new Vue({
            el:'#app',
            methods:{
                click(){
                    console.log('Did click!');
                }
            }
        })
    </script>

    <!-- 你还可以绑定 鼠标事件 键盘事件 表单事件等等 -->
    <!-- 例如： -->
    <!-- v-on:keyup="up" -->
```

### 简写 @
```html
    <div id="app" @click="click">按钮</div>
```

## v-if
    v-if能根据后面的属性值 来控制dom是否被创建和渲染 类似于 angular 的 ng-if

### 用法
```html
    <div id="app" v-if="false"> 这个节点不会渲染 </div>
```

## v-else-if
    和 else if  一样
## v-else
    和 else 一样
## v-model
    v-model 的用法于ng-model 一样 用于把数据绑双向定到视图层。

### 用法
```html
        <input v-model="value"/>
        <div v-if="value>0">大于零</div>
        <div v-else-if="value==0">等于零</div>
        <div v-else>小于零</div> -->
```


## v-show
    v-show能根据后面的属性值 来控制dom的display 属性是否为 block/inline/inline-block/.. 还是none 类似于 angular 的 ng-show

    vue里面没有v-hide

### 用法
```html
    <div id="app" v-show="false"> 这个节点存在于dom树但是不显示</div>
    <div id="app2" v-show="value>20">展示一个大于20的数据 {{value}}</div>
```

## v-for
    v-for 类似于 angular 的 ng-repeat

### 用法
```html
    <div id="app" v-for="(value,index) in [1,2,3,4]">{{ index }}{{ value }}</div>

    <div id="app" v-for="(value,index) in arr">{{ index }}{{ value }}</div>
    <script>
        new Vue({
            el:'#app',
            data:{
                arr:['红','绿','蓝']
                }
            }
        })
    </script>
    <!-- 如何不用(value,index) 那么是不能使用index 的 不像angular的$index那样能不声明就用 你可以声明任意变量名 如 (val,ind) in arr -->
```

## v-once
    被这个指令标记的元素只被渲染一次 也就是数据发生更新的时候 它不会触发 beforeUpdata 和 updataed 钩子 也不会更新数据

### 用法

```html
    <div id="app" v-once >
        <div>{{value}}</div>
        <div @click="change">改变</div>
    </div>
    <script>
        new Vue({
            el:'#app',
            data:{
                value:'init'
                }
            },
            methods:{
                change(){
                    this.value='updata';
                }
            }
        })
    </script>
```


## v-pre
跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

demo：
```html
<span v-pre>{{ this will not be compiled }}</span>
```

## v-cloak

这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

```css
[v-cloak] {
  display: none;
}
```
```html
<div v-cloak>
  {{ message }}
</div>
```
不会显示，直到编译结束。

## slot  (特殊属性 并不是内置指令)

```html
    <div id="app">
        <test>  <!-- 你定义的组件  -->
            <div slot="title">头部</div>   
            <div slot="footer">脚部</div> 
        </test>
    </div>
```

```js
    Vue.component('test',{
        template:`<div>  
                    <slot name="title"></slot>
                     组件其他内容   
                     <slot name="footer"></slot>    
                  </div>`
    })
```