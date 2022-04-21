export const extend = Object.assign


export function isObject(val) {
    return val !== null && typeof val === 'object'
}


export const hasChanged = (val, newValue) => {
    return !Object.is(val, newValue)
}

export const hasOwn = (val,key)=>Object.prototype.hasOwnProperty.call(val,key)