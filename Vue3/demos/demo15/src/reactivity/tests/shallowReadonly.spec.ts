import { isProxy, isReadonly, shallowReadonly } from "../reactive"


describe('shallowReadonly', () => {
    it('should not make no-reactive properties reactive', () => {
        const props = shallowReadonly({
            n: { foo: 1 }
        })

        expect(isReadonly(props)).toBe(true)
        expect(isReadonly(props.n)).toBe(false)

        // 检测 isProxy
        expect(isProxy(props)).toBe(true)
    })

    it('warn then call set', () => {
        // mock
        console.warn = jest.fn()

        const user = shallowReadonly({
            age: 10
        })

        user.age = 11

        expect(console.warn).toBeCalled()
    })
})