import { h } from '../../../lib/guide-mini-vue.esm.js'

export const App = {
    render() {
        return h('div', {
            id:'root',
            class:["red","hard"]
        }, [
            "hi",
            h('div',{
                class:'red'
            },'mini-vue')
        ])
    },
    setup() {
        return {
            msg: 'mini-vue'
        }
    }
}