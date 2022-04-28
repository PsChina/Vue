
import { getCurrentInstance } from './component';

export function provide(key,value){
 // 存
 const currentInstance:any = getCurrentInstance()

 if(currentInstance){
  let { provides }  = currentInstance
  const parentProvides = currentInstance?.parent?.provides
  if(provides === parentProvides){
    provides = currentInstance.provides = Object.create(parentProvides?parentProvides:null)
  }
  provides[key] = value
 }
 
}

export function inject(key, defaultValue){ // 获取祖先组件的 provides 里面 key 对应的 value
  // 取
  const currentInstance:any = getCurrentInstance()
 
  const provides = currentInstance?.parent?.provides

  if(provides){
      if(key in provides){
        return provides[key]
      } else if(defaultValue){
        if(typeof defaultValue === 'function'){
          return defaultValue()
        }
        return defaultValue
      }
     
  }


}