import { h } from '../../../lib/guide-mini-vue.esm.js'

export const App = {
    render() {
        return h('div', null, "hi-mini-vue")
    },
    setup() {
        return {
            msg: 'mini-vue'
        }
    }
}