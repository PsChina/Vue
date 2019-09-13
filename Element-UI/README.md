# Element-UI

稍微记录下 Element-UI 使用过程中需要注意的地方

## el-table 组件选择 cell 时不支持点击任意位置选中 cell

解决办法

在 `<el-table>` 标签中绑定 `@row-click="rowClick"` 和 `ref="table"`

然后在单击事件的方法中写 `this.$refs.table.toggleRowSelection(row)`

```html
<template>
    <el-table @row-click="rowClick" ref="table" />
</template>
<script>
    export default {
        methods: {
            rowClick(row){
                this.$refs.table.toggleRowSelection(row)
            }
        }
    }
</script>
```

## el-menu

2019年 9月份我遇到了一个 bug 要修改 el-menu 关闭状态时 切换 tab 的联动效果。

起先我以为这个效果时 element-ui 实现的应该有对应的 api 提供开关。

但是没有找到所以就打算自己动手实现一个 menu, 但是遇到了诸多问题, 考虑到时间成本我打算放弃。

于是和同事讨论，同事提醒说 element-ui 不会实现业务逻辑一定有办法解决。

虽然我知道是这样的但是由于我没有找到对应的 api 所以我认为自能自己解决了。

最后是另一位同事在代码中找到了封装动画的 api close 和 open 解决了这个困扰我一周的问题。

感谢。

总结:

1. element-ui 不会实现业务逻辑一定有办法解决业务逻辑的 bug 所以没有必要自己实现一套组件 有 bug 就解决 bug。
2. 在没有充分阅读代码的情况下不要做过多的猜测，一定要看代码。

