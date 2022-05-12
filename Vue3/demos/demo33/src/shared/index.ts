export const extend = Object.assign

export const EMPTY_OBJ = {}

export function isObject(val) {
    return val !== null && typeof val === 'object'
}


export const hasChanged = (val, newValue) => {
    return !Object.is(val, newValue)
}

export const hasOwn = (val,key)=>Object.prototype.hasOwnProperty.call(val,key)


export const capitalize = (str:string)=>{
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
 
export const tohandlerKey = (str:string)=>{
    return str ? 'on'+ capitalize(str) : ''
}