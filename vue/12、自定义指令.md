# 自定义指令
 vue 提供自定义指令 允许用户根据具体业务定制出合适的指令。

## 如何使用

在Vue中自定义指令分为全局自定义指令和局部自定义指令

### 定义 全局自定义指令
``` js
Vue.directive() // 这个方法用于定义一个全局自定义指令

// 接收2个参数

// 第一个参数 表示指令名称 类型是字符串

// 第二个参数 是自定义指令的具体实现 类型是对象

// 例如: 定义一个判断左滑手势的指令

Vue.directive('swipeleft',{
    bind (el, binding, vnode) {  // 这个钩子 是当指令绑定到元素上的时候被触发一次
			const gestureManager = {}
			function start(event) {
				gestureManager.startPoint = [event.touches[0].pageX, event.touches[0].pageY]
			}
			function move(event) {
				gestureManager.endPoint = [event.touches[0].pageX, event.touches[0].pageY]
			}
			function end(event) {
				const distanceX = gestureManager.startPoint[0] - gestureManager.endPoint[0];
				if (distanceX > 30) {
					binding.value()
				}
			}
			el.addEventListener('touchstart', start)
			el.addEventListener('touchmove', move)
			el.addEventListener('touchend', end)
		}
})

```

接下来我们来看一下 bind 这个钩子函数内的 三个参数分别是什么

1、 el

el 是该指令绑定到的目标元素 可以直接操作dom

2、 binding

binding 是一个对象 含有以下属性

name：指令名，不包括 v- 前缀。

value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。

oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。

expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。

arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。

modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。

3、 vnode

Vue 编译生成的虚拟节点。

例如

```js
{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 `on`
  // 所以不再支持如 `v-on:keyup.enter` 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```

在 update 和 componentUpdated 钩子中 还有一个参数

oldVnode：上一个虚拟节点。


``` html
<div id="app" v-swipeleft="swipeleft"></div>
<!-- 
    new Vue({
        el:'#app',
        methods:{
            swipeleft(){
                console.log('did swipe left')
            }
        }
    })
 -->
```

其实自定义指令不止 bind 一个钩子
``` js

Vue.directive('firstdirective',{
    bind(el,binding,vnode){
        // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    },
    inserted(el,binding,vnode){
        // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    },
    update(el,binding,vnode,oldVnode){
        // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
    },
    componentUpdated(el,binding,vnode,oldVnode){
        // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    },
    unbind(el,binding,vnode){
        // 只调用一次，指令与元素解绑时调用。
    }
})
```


### 定义 局部自定义指令

``` html
    <div id="app" v-firstdirective="fn">
    </div>
```

``` js
    new Vue({
        el:'#app',
        directives:{
            firstdirective:{
                bind(){

                }
                // ...
            }
        },
        methods:{
            fn(){
                
            }
        }
    })
```