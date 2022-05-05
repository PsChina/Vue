import { shallowReadonly } from '../reactivity/reactive';
import { initProps } from './componentProps';
import { PublicInstanceProxyHandlers } from './componentPublicInstance';
import { emit } from './componentEmit'
import { initSlots } from './componentSlots';

export function createComponentInstance(vnode, parent) {
    const component = {
        vnode,
        type: vnode.type,
        setupState:{},
        props:{},
        slots:{},
        provides:parent ? parent.provides : {},
        parent,
        emit:()=>{},
    }
    component.emit = emit.bind(null,component) as any
    return component
}

export function setUpcomponent(instance) {
    initProps(instance,instance.vnode.props)
    initSlots(instance,instance.vnode.children)
    setupStatefulComponent(instance)
}

function setupStatefulComponent(instance) {
    const Component = instance.type
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers)

    const { setup } = Component
    if (setup) {
        // 在 setup 调用之前设置 instance
        setCurrentInstance(instance)
        const setupResult = setup(shallowReadonly(instance.props),{emit:instance.emit})
        // 调用之后置空
        setCurrentInstance(null)
        handleSetupResult(instance, setupResult)
    }

}

function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult
    }
    finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
    const Component = instance.type
    instance.render = Component.render
}

let currentInstance = null

export function getCurrentInstance(){
    return currentInstance
}

function setCurrentInstance(instance){
    currentInstance = instance
}
