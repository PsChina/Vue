import { reactive, isReactive } from "../reactive"

describe('reactive', () => {
    it('happy path', () => {
        const original = { foo: 1 }
        // 初始化响应式对象
        const observed = reactive(original)
        // 响应式对象不应等于原对象
        expect(original).not.toBe(observed)
        // 初始化过后响应式对象属性的值应该等于原对象属性的值
        expect(original.foo).toBe(observed.foo)
        // 设置属性
        observed.foo++
        expect(observed.foo).toBe(2)

        // 实现 isReactive
        expect(isReactive(observed)).toBe(true)

        expect(isReactive(original)).toBe(false)
    })

    it('nested reactive', () => {
        const orignial = {
            nested: {
                foo: 1,
            },
            array: [{ bar: 2 }]
        }
        const observed = reactive(orignial)
        expect(isReactive(observed.nested)).toBe(true)
        expect(isReactive(observed.array)).toBe(true)
        expect(isReactive(observed.array[0])).toBe(true)
    })
})