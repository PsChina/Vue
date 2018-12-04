# Element-UI

稍微记录下 Element-UI 使用过程中需要注意的地方

## table 组建选择 cell 时不支持点击任意位置选中 cell

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