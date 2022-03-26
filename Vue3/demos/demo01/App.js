import { reactive, watchEffect } from './core/reactivity/index.js'
import { h } from './core/h.js'
export default {
    render(context) {
        return h('div', { id: 'myDiv' }, [
            'Hello',
            String(context.state.count),
            String(context.state.double),
            h('button', {
                onClick: context.handleClick
            }, 'click')
        ])
    },
    setup() {
        const state = reactive({
            count: 1,
            double: 1,
        })

        watchEffect(() => {
            state.double = state.count * 2
        })

        const handleClick = () => {
            state.count++
        }

        window.state = state

        return {
            handleClick,
            state
        }
    }
}