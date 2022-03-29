import { hasChanged, isObject } from "../shared"
import { isTraking, trickEffects, triggerEffects } from "./effect"
import { reactive } from "./reactive"


class RefImpl {
    private _rawValue: any
    private _value: any
    public __v_isRef = true
    public dep
    constructor(value) {
        // 保存原来的值以便用Object.is(hasChanged)比较差异
        this._rawValue = value
        // 值类型和对象类型分别采用不同的方式处理
        this._value = covert(value)
        this.dep = new Set()
    }
    get value() {
        trackRefValue(this)
        return this._value
    }
    set value(newValue) {
        if (hasChanged(this._rawValue, newValue)) {
            this._rawValue = newValue
            this._value = covert(newValue)
            triggerEffects(this.dep)
        }
    }
}
// covert 复用相同的处理方式 新的 value 如果是一个对象那么仍然需要用 reactive 包裹
function covert(value) {
    return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref) {
    if (isTraking()) {
        trickEffects(ref.dep)
    }
}

export function ref(value) {
    return new RefImpl(value)
}

export function isRef(ref) {
    return !!ref.__v_isRef
}

export function unRef(ref) {
    return isRef(ref) ? ref.value : ref
}