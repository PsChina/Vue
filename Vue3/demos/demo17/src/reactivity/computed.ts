import { ReactiveEffect } from "./effect"


class ComputedRefIml {
    private _value: any
    private _dirty: boolean = true
    private _effect: any
    constructor(getter) {
        this._effect = new ReactiveEffect(getter, () => {
            if (!this._dirty) {
                this._dirty = true
            }
        })
    }
    get value() {
        // get
        if (this._dirty) {
            // 执行并且依赖收集
            this._value = this._effect.run()
            this._dirty = false
        }
        return this._value
    }
}

export function computed(getter) {
    return new ComputedRefIml(getter)
}