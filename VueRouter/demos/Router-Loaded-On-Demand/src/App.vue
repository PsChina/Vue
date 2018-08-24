<template>
    <div>
        <router-view></router-view>
        <router-link to="/page1" tag="span" active-class="active">button1</router-link>
        <router-link to="/page2" tag="span" active-class="active">button2</router-link>
        <router-link to="/page3" tag="span" active-class="active">button3</router-link>
    </div>
</template>

<script>
export default {
    data () {
        return {
            text:'Hello World!!!'
        }
    }
}
</script>

<style>
    .active{
        color: green
    }
</style>
