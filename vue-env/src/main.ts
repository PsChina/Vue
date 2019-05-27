import Vue from 'vue'
// import './less.less'
// import './scss.scss'
import App from './App.vue'

import A from './demo'

new A()

new Vue({
    el: '#app',
    render(h){
        return h(App)
    }
})
