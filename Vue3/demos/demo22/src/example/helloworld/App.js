import { h } from '../../../lib/guide-mini-vue.esm.js'

export const App = {
    render() {
        return h('div', {
            id: 'root',
            class: ["red", "hard"]
        }, [
            "hi",
            h('div', {
                class: 'red',
                onClick() {
                    console.log('hello', this.msg)
                },
                onMousedown() {
                    console.log('onMousedown')
                }
            }, this.msg)
        ])
    },
    setup() {
        return {
            msg: 'mini-vue shapFlag'
        }
    }
}