import { tohandlerKey } from "../shared"

export function emit(instance,event, ...args){
  const { props } = instance
  const camelize = (str:string)=>{
     return str.replace(/-(\w)/g,(_,c:string)=>{
      return c ? c.toUpperCase():''
     })
  }

  const handleName = tohandlerKey(camelize(event))
  const handler = props[handleName]
  handler && handler(...args)
}