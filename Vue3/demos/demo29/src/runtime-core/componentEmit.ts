export function emit(instance,event, ...args){
  const { props } = instance
  const camelize = (str:string)=>{
     return str.replace(/-(\w)/g,(_,c:string)=>{
      return c ? c.toUpperCase():''
     })
  }
  const capitalize = (str:string)=>{
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  const tohandlerKey = (str:string)=>{
    return str ? 'on'+ capitalize(str) : ''
  }
  const handleName = tohandlerKey(camelize(event))
  const handler = props[handleName]
  handler && handler(...args)
}