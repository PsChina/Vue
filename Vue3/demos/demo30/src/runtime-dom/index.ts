import { createRenderer } from '../runtime-core'
import { createApp } from '../../../demo01/core/index';

function createElement(type){
  return document.createElement(type)
}

function patchProp(el,key,val){
  const isOn = (key: string) => /^on[A-Z]/.test(key)
  if (isOn(key)) {
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event, val)
  } else {
      el.setAttribute(key, val)
  }
}

function insert(el,container){
  container.append(el)
}

const renderer:any =  createRenderer({
  createElement,
  patchProp,
  insert
})

export function createApp(...args){
  return renderer.createApp(...args)
}

export * from '../runtime-core'