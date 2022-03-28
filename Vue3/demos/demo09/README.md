# 优化 stop 功能

1. 当响应式对象使用 `++` 语法的时候 runner 仍然不会自动调用

## 测试用例

```ts
    it('stop', () => {
        let dummy
        const obj = reactive({ prop: 1 })
        const runner = effect(() => {
            dummy = obj.prop
        })
        obj.prop = 2
        expect(dummy).toBe(2)
        stop(runner)
        obj.prop = 3
        expect(dummy).toBe(2)

        // toped effect should still be manually callable
        // 被停止的 effect 仍然能被手动调用
        runner()
        expect(dummy).toBe(3)

        obj.prop++

        expect(dummy).toBe(3)
    })
```

测试不能通过

## 分析

当调用 `++` 语法的时候会触发 getter 器那么就会再次收集依赖

为了避免已经清除的依赖被再次收集需要在每次依赖收集之前判断该依赖是否被停止


## Run

```bash
yarn install
```

```bash
yarn test
```

## 具体实现


effect.ts
```ts
let activeEffect, shouldTrack

class ReactiveEffect {
    private _fn: any
    onStop?: () => void
    active: boolean = true
    deps: Set<ReactiveEffect>[] = []
    constructor(fn, public scheduler) {
        this._fn = fn
    }
    run() {
        // 在收集依赖之前判断当前依赖是否被停止
        if (!this.active) {
            // active 为false 说明已经被stop了不需要收集依赖（不需要绑定activeEffect）直接运行fn
            return this._fn()
        }
        // 把活动的 effect 实例绑定到 activeEffect
        activeEffect = this
        // 依赖收集没有被停止应该收集依赖
        shouldTrack = true
        let res = this._fn()
        // 依赖收集发生在 _fn 运行时触发 getter 器。
        activeEffect = null
        // 收集完依赖以后关闭收集依赖开关
        shouldTrack = false
        return res
    }
    // 停止当前effect的依赖自动更新
    stop() {
        if (this.active) {
            clearupEffect(this)
            if (this.onStop) {
                this.onStop()
            }
            //标记依赖被停止
            this.active = false
        }
    }
}

function isTraking() {
    // activeEffect 和 shouldTrack 存在的情况下处于依赖收集的状态
    return activeEffect && shouldTrack
}

// 依赖收集
export function trick(target, key) {
    // 判断是否应该收集依赖
    if (!isTraking()) return
    const dep = getDep(target, key)
    // 将当前活动的回调函数 effect 存储在 reactive 对象对应 key 的 dep 内。
    dep.add(activeEffect)
    // 反向收集依赖
    activeEffect.deps.push(dep)

}
```
