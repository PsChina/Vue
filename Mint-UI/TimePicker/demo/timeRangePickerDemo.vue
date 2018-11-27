<template> 
    <range-picker
        v-show="showTimePicker"
        :startYear="new Date().getFullYear()-20"
        :endYear="new Date().getFullYear()"
        :dateUnits="['年','月','日']"
        @ok="onOk"
        @cancel="hideSelector"></range-picker>
</template>

<script>
export default {
    data(){
        return {
            showTimePicker: false,
        }
    },
    methods: {
        toggleTimePicker() {
        this.showTimePicker = !this.showTimePicker
        },
        onOk(val) {
        this.timeRange = `${val[0].replace(/-/ig, '/')}-${val[1].replace(/-/ig, '/')}`
        this.hideSelector()
        },
        hideSelector() {
        this.toggleTimePicker()
        this.show = false
        } 
    }
}
</script>

<style>

</style>
