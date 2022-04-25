import { shallowReadonly } from '../reactivity/reactive';
import { initProps } from './componentProps';
import { PublicInstanceProxyHandlers } from './componentPublicInstance';
import { emit } from './componentEmit'
import { initSlots } from './componentSlots';

export function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState:{},
        props:{},
        slots:{},
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
        const setupResult = setup(shallowReadonly(instance.props),{emit:instance.emit})
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
