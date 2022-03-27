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

        // 定义响应关系 nextAge 的改变随着 user.age 的改变而改变 nextAge 比 user.age 大一
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

    it('should reutrn runner when call effect', () => {
        let foo = 10
        const runner = effect(() => {
            foo++
            return 'foo'
        })
        expect(foo).toBe(11)

        const r = runner()

        expect(foo).toBe(12)

        expect(r).toBe('foo')
    })

    it('scheduler', () => {
        let dummy
        let run: any
        const scheduler = jest.fn(() => {
            run = runner
        })
        const obj = reactive({
            foo: 1
        })
        const runner = effect(() => {
            dummy = obj.foo
        }, {
            scheduler
        })

        expect(scheduler).not.toHaveBeenCalled()
        expect(dummy).toBe(1)

        // should be called on first trigger 应该在第一次触发依赖的时候被调用
        obj.foo++
        expect(scheduler).toHaveBeenCalledTimes(1)

        // should not run yet (runner 应该没有被调用)
        expect(dummy).toBe(1)

        // manually run 手动运行(runner)
        run()

        // runner 应该被调用
        expect(dummy).toBe(2)
    })
})