import { isProxy, isReadonly, readonly } from "../reactive"


describe('readonly', () => {
    it('happy path', () => {

        const original = {
            foo: 1,
            bar: { baz: 2 }
        }

        const wrapped = readonly(original)

        expect(wrapped).not.toBe(original)

        expect(wrapped.foo).toBe(1)

        // 检测 isReadonly
        expect(isReadonly(wrapped)).toBe(true)
        expect(isReadonly(wrapped.bar)).toBe(true)
        expect(isReadonly(original)).toBe(false)
        expect(isReadonly(original.bar)).toBe(false)

        // 检测 isProxy
        expect(isProxy(wrapped)).toBe(true)
        expect(isProxy(original)).toBe(false)

    })

    it('warn then call set', () => {
        // mock
        console.warn = jest.fn()

        const user = readonly({
            age: 10
        })

        user.age = 11

        expect(console.warn).toBeCalled()
    })

})