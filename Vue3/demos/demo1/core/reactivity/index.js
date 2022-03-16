
let currentEffect, targetMaps = new Map();
class Dep {
    _val = undefined;
    constructor(val) {
        this._val = val;
        this.effects = new Set();
    }
    get value() {
        return this._val;
    }
    set value(val) {
        return this._val = val;
    }
    depend() {
        if (currentEffect) {
            this.effects.add(currentEffect)
        }
    }
    notice() {
        this.effects.forEach((effect) => {
            effect()
        })
    }
}



export function watchEffect(effect) {
    currentEffect = effect
    effect()
    currentEffect = null
}

function getDep(target, key) {
    let depMaps = targetMaps.get(target)
    if (!depMaps) {
        depMaps = new Map()
        targetMaps.set(target, depMaps)
    }
    let dep = depMaps.get(key)
    if (!dep) {
        dep = new Dep()
        depMaps.set(key, dep)
    }
    return dep
}

export function reactive(obj) {
    return new Proxy(obj, {
        set(target, key, val) {
            const dep = getDep(target, key)
            Reflect.set(target, key, val)
            dep.notice()
            return val
        },
        get(target, key) {
            const dep = getDep(target, key)
            dep.depend()
            return Reflect.get(target, key)
        }
    })
}