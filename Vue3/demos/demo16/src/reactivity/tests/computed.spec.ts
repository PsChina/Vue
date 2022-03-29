import { computed } from "../computed"
import { reactive } from "../reactive"

describe('computed', () => {
    it('happy path', () => {
        // ref
        // .value
        // 1. 缓存
        const user = reactive({
            age: 1,
        })
        const age = computed(() => {
            return user.age
        })

        expect(age.value).toBe(1)

    })

    it('should compute lazily', () => {
        const value = reactive({
            foo: 1
        })
        const getter = jest.fn(() => {
            return value.foo
        })
        const cValue = computed(getter)
        // lazy
        expect(getter).not.toHaveBeenCalled()

        expect(cValue.value).toBe(1)

        expect(getter).toHaveBeenCalledTimes(1)

        // should not compute again
        cValue.value
        expect(getter).toHaveBeenCalledTimes(1)

        // should not computed untill needed
        value.foo = 2
        // 这里为什么是 1 次呢应为它是lazy的即便值改变了但是没有读取所以就没有调用
        expect(getter).toHaveBeenCalledTimes(1)

        // now it should compute
        // 下面读取一下值会被调用
        expect(cValue.value).toBe(2)
        expect(getter).toHaveBeenCalledTimes(2)

        // should not compute again (缓存值)
        cValue.value
        expect(getter).toHaveBeenCalledTimes(2)

    })
})

