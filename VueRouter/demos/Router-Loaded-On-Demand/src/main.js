import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router-config'

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
})

new Vue({
    el:'#app',
    router,
    components:{
        App,
    },
    template:'<App/>'
})