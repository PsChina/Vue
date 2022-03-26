import { reactive } from "../reactive"
import { effect } from '../effect';

describe('effect', () => {
    it('happy path', () => {
        // 初始化响应式对象 user
        const user = reactive({
            age: 10
        })
        // 定义目标容器
        let nextAge

        // 定义响应关系 nextAge 的改变随着 user.age 的 改变而改变 nextAge 比 user.age 大一
        effect(() => {
            nextAge = user.age + 1
        })

        // 检测 effect 初始化是否达标
        expect(nextAge).toBe(11)

        // update
        user.age++

        // 检测 当依赖改变时 effect 是否达标
        expect(nextAge).toBe(12)
    })
})