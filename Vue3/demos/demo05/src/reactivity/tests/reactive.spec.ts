import { reactive } from "../reactive"

describe('reactive', () => {
    it('happy path', () => {
        const original = { foo: 1 }
        // 初始化响应式对象
        const observed = reactive(original)
        // 响应式对象不应等于原对象
        expect(original).not.toBe(observed)
        // 初始化过后响应式对象属性的值应该等于原对象属性的值
        expect(original.foo).toBe(observed.foo)
    })
})