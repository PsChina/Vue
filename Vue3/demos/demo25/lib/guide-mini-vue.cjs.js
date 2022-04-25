'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        shapeFlag: getShapFlag(type),
        el: null
    };
    if (typeof children === 'string') {
        vnode.shapeFlag |= 4 /* TEXT_CHILDREN */;
    }
    else if (Array.isArray(children)) {
        vnode.shapeFlag |= 8 /* ARRAY_CHILDREN */;
    }
    return vnode;
}
function getShapFlag(type) {
    return typeof type === 'string'
        ? 1 /* ELEMENT */
        : 2 /* STATEFUL_COMPONENT */;
}

const extend = Object.assign;
function isObject(val) {
    return val !== null && typeof val === 'object';
}
const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key);

// 全局的当前活跃的effect
// 全局依赖存储map
const targetMaps = new Map();
// 初始化依赖数据结构以及获取dep
function getDep(target, key) {
    let depMaps = targetMaps.get(target);
    if (!depMaps) {
        depMaps = new Map();
        targetMaps.set(target, depMaps);
    }
    let dep = depMaps.get(key);
    if (!dep) {
        dep = new Set();
        depMaps.set(key, dep);
    }
    return dep;
}
// 触发依赖
function trigger(target, key) {
    // 将存储在 reactive 对象对应 key 的所有依赖取出 
    const dep = getDep(target, key);
    // 挨个调用 update 回调函数
    triggerEffects(dep);
}
// 执行 effect
function triggerEffects(dep) {
    dep.forEach(reactiveEffect => {
        if (reactiveEffect.scheduler) {
            reactiveEffect.scheduler();
        }
        else {
            reactiveEffect.run();
        }
    });
}

const get = createGetter();
const set = createSetter();
const readonyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        if (key === "__v_is_reactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_is_readonly" /* IS_READONLY */) {
            return isReadonly;
        }
        const res = Reflect.get(target, key, receiver);
        if (shallow) {
            return res;
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter() {
    return function set(target, key, value, receiver) {
        Reflect.set(target, key, value, receiver);
        // 触发依赖
        trigger(target, key);
        return value;
    };
}
const mutableHandlers = {
    get,
    set
};
const readonlyHandlers = {
    get: readonyGet,
    set(target, key, value, receiver) {
        console.warn();
        return value;
    }
};
const shallowReadonlyHandles = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
});

function reactive(raw) {
    return createActiveObject(raw, mutableHandlers);
}
function readonly(raw) {
    return createActiveObject(raw, readonlyHandlers);
}
function shallowReadonly(raw) {
    return createActiveObject(raw, shallowReadonlyHandles);
}
function createActiveObject(target, bashHandlers) {
    if (!isObject(target)) {
        console.warn(`target ${target} 必须是一个对象`);
        return target;
    }
    return new Proxy(target, bashHandlers);
}

function initProps(instance, rawProps) {
    instance.props = rawProps || {};
}

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
    $slots: (i) => i.slots
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { setupState, props } = instance;
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
        // setup -> options data
        // $data
    }
};

function emit(instance, event, ...args) {
    const { props } = instance;
    const camelize = (str) => {
        return str.replace(/-(\w)/g, (_, c) => {
            return c ? c.toUpperCase() : '';
        });
    };
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const tohandlerKey = (str) => {
        return str ? 'on' + capitalize(str) : '';
    };
    const handleName = tohandlerKey(camelize(event));
    console.log('handleName=>', handleName);
    const handler = props[handleName];
    handler && handler(...args);
}

function initSlots(instance, children) {
    instance.slots = children;
}

function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        emit: () => { },
    };
    component.emit = emit.bind(null, component);
    return component;
}
function setUpcomponent(instance) {
    initProps(instance, instance.vnode.props);
    initSlots(instance, instance.vnode.children);
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.type;
    instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
        const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit });
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

function render(vnode, container) {
    // patch
    patch(vnode, container);
}
function patch(vnode, container) {
    const { shapeFlag } = vnode;
    // 判断 vnode 类型
    if (shapeFlag & 1 /* ELEMENT */) {
        processElement(vnode, container);
    }
    else if (shapeFlag & 2 /* STATEFUL_COMPONENT */) {
        // 根据不同类型来处理不同的虚拟节点
        processComponent(vnode, container);
    }
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setUpcomponent(instance);
    setupRenderEffect(instance, vnode, container);
    // return instance
}
function mountElement(vnode, container) {
    const { type, children, shapeFlag, props } = vnode;
    const el = (vnode.el = document.createElement(type));
    // string
    if (shapeFlag & 4 /* TEXT_CHILDREN */) {
        el.textContent = children;
    }
    else if (shapeFlag & 8 /* ARRAY_CHILDREN */) {
        mountChildren(vnode, el);
    }
    // props
    for (const key in props) {
        const val = props[key];
        const isOn = (key) => /^on[A-Z]/.test(key);
        if (isOn(key)) {
            const event = key.slice(2).toLowerCase();
            el.addEventListener(event, val);
        }
        else {
            el.setAttribute(key, val);
        }
    }
    container.append(el);
}
function mountChildren(vnode, container) {
    vnode.children.forEach((v) => {
        if (typeof v === 'string') {
            container.append(v);
        }
        else {
            patch(v, container);
        }
    });
}
function setupRenderEffect(instance, vnode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    patch(subTree, container);
    // element -> mount
    vnode.el = subTree.el;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            //  先把组件转换为虚拟节点
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
