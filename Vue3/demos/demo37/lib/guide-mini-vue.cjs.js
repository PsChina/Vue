'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const extend = Object.assign;
const EMPTY_OBJ = {};
function isObject(val) {
    return val !== null && typeof val === 'object';
}
const hasChanged = (val, newValue) => {
    return !Object.is(val, newValue);
};
const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key);
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
const tohandlerKey = (str) => {
    return str ? 'on' + capitalize(str) : '';
};

// 全局的当前活跃的effect
let activeEffect, shouldTrack;
// effect 类
class ReactiveEffect {
    constructor(fn, scheduler) {
        this.scheduler = scheduler;
        this.active = true;
        this.deps = [];
        this._fn = fn;
    }
    run() {
        // 在收集依赖之前判断当前依赖是否被停止
        if (!this.active) {
            // active 为false 说明已经被stop了不需要收集依赖（不需要绑定activeEffect）直接运行fn
            return this._fn();
        }
        // 把活动的 effect 实例绑定到 activeEffect
        activeEffect = this;
        // 依赖收集没有被停止应该收集依赖
        shouldTrack = true;
        let res = this._fn();
        // 依赖收集发生在 _fn 运行时触发 getter 器。
        activeEffect = null;
        // 收集完依赖以后关闭收集依赖开关
        shouldTrack = false;
        return res;
    }
    // 停止当前effect的依赖自动更新
    stop() {
        if (this.active) {
            clearupEffect(this);
            if (this.onStop) {
                this.onStop();
            }
            //标记依赖被停止
            this.active = false;
        }
    }
}
function clearupEffect(effect) {
    effect.deps.forEach(dep => {
        dep.delete(effect);
    });
    effect.deps = [];
}
function effect(fn, options = {}) {
    // 实例化fn 并立即执行依赖收集
    const _effect = new ReactiveEffect(fn, options.scheduler);
    extend(_effect, options);
    _effect.run();
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
}
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
function isTraking() {
    // activeEffect 和 shouldTrack 存在的情况下处于依赖收集的状态
    return activeEffect && shouldTrack;
}
// 依赖收集
function trick(target, key) {
    // 判断是否应该收集依赖
    if (!isTraking())
        return;
    const dep = getDep(target, key);
    // 将当前活动的回调函数 effect 存储在 reactive 对象对应 key 的 dep 内。
    trickEffects(dep);
    // 反向收集依赖
    activeEffect.deps.push(dep);
}
// 添加 effect 到 dep
function trickEffects(dep) {
    if (dep.has(activeEffect))
        return; // 避免重复收集
    dep.add(activeEffect);
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
        // 依赖收集
        if (!isReadonly) {
            trick(target, key);
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
    $slots: (i) => i.slots,
    $props: (i) => i.props,
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
    const handleName = tohandlerKey(camelize(event));
    const handler = props[handleName];
    handler && handler(...args);
}

function initSlots(instance, children) {
    // instance.slots = Array.isArray(children) ? children : [children] 
    const { vnode } = instance;
    if (vnode.shapeFlag & 16 /* SLOT_CHILDREN */) {
        normalizeObjectSlots(children, instance.slots);
    }
}
function normalizeObjectSlots(children, slots) {
    for (const key in children) {
        const value = children[key];
        // slot
        slots[key] = (props) => normalizeSlotValue(value(props));
    }
    slots = slots;
}
function normalizeSlotValue(value) {
    return Array.isArray(value) ? value : [value];
}

class RefImpl {
    constructor(value) {
        this.__v_isRef = true;
        // 保存原来的值以便用Object.is(hasChanged)比较差异
        this._rawValue = value;
        // 值类型和对象类型分别采用不同的方式处理
        this._value = covert(value);
        this.dep = new Set();
    }
    get value() {
        trackRefValue(this);
        return this._value;
    }
    set value(newValue) {
        if (hasChanged(this._rawValue, newValue)) {
            this._rawValue = newValue;
            this._value = covert(newValue);
            triggerEffects(this.dep);
        }
    }
}
// covert 复用相同的处理方式 新的 value 如果是一个对象那么仍然需要用 reactive 包裹
function covert(value) {
    return isObject(value) ? reactive(value) : value;
}
function trackRefValue(ref) {
    if (isTraking()) {
        trickEffects(ref.dep);
    }
}
function ref(value) {
    return new RefImpl(value);
}
function isRef(ref) {
    return !!ref.__v_isRef;
}
function unRef(ref) {
    return isRef(ref) ? ref.value : ref;
}
function proxyRefs(ref) {
    return new Proxy(ref, {
        get(target, key) {
            return unRef(Reflect.get(target, key));
        },
        set(target, key, value) {
            if (isRef(target[key]) && !isRef(value)) {
                return target[key].value = value;
            }
            else {
                return Reflect.set(target, key, value);
            }
        }
    });
}

function createComponentInstance(vnode, parent) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        provides: parent ? parent.provides : {},
        parent,
        isMounted: false,
        subTree: {},
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
        // 在 setup 调用之前设置 instance
        setCurrentInstance(instance);
        const setupResult = setup(shallowReadonly(instance.props), { emit: instance.emit });
        // 调用之后置空
        setCurrentInstance(null);
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === 'object') {
        instance.setupState = proxyRefs(setupResult);
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}
let currentInstance = null;
function getCurrentInstance() {
    return currentInstance;
}
function setCurrentInstance(instance) {
    currentInstance = instance;
}

const Fragment = Symbol('Fragment');
const Text = Symbol('Text');
function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        component: null,
        key: props && props.key,
        shapeFlag: getShapFlag(type),
        el: null
    };
    if (typeof children === 'string') {
        vnode.shapeFlag |= 4 /* TEXT_CHILDREN */;
    }
    else if (Array.isArray(children)) {
        vnode.shapeFlag |= 8 /* ARRAY_CHILDREN */;
    }
    if (vnode.shapeFlag & 2 /* STATEFUL_COMPONENT */) {
        if (typeof children === 'object') {
            vnode.shapeFlag |= 16 /* SLOT_CHILDREN */;
        }
    }
    return vnode;
}
function createTextVNode(text) {
    return createVNode(Text, {}, text);
}
function getShapFlag(type) {
    return typeof type === 'string'
        ? 1 /* ELEMENT */
        : 2 /* STATEFUL_COMPONENT */;
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

function renderSlots(slots, name, props) {
    const slot = slots[name];
    if (slot) {
        if (typeof slot === 'function') {
            return createVNode(Fragment, {}, slot(props));
        }
    }
    return {};
}

function provide(key, value) {
    var _a;
    // 存
    const currentInstance = getCurrentInstance();
    if (currentInstance) {
        let { provides } = currentInstance;
        const parentProvides = (_a = currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.parent) === null || _a === void 0 ? void 0 : _a.provides;
        if (provides === parentProvides) {
            provides = currentInstance.provides = Object.create(parentProvides ? parentProvides : null);
        }
        provides[key] = value;
    }
}
function inject(key, defaultValue) {
    var _a;
    // 取
    const currentInstance = getCurrentInstance();
    const provides = (_a = currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.parent) === null || _a === void 0 ? void 0 : _a.provides;
    if (provides) {
        if (key in provides) {
            return provides[key];
        }
        else if (defaultValue) {
            if (typeof defaultValue === 'function') {
                return defaultValue();
            }
            return defaultValue;
        }
    }
}

function createAppAPI(render) {
    return function createApp(rootComponent) {
        return {
            mount(rootContainer) {
                //  先把组件转换为虚拟节点
                const vnode = createVNode(rootComponent);
                render(vnode, rootContainer);
            }
        };
    };
}

function shouldUpdateComponent(n1, n2) {
    const { props: prevProps } = n1;
    const { props: nextProps } = n2;
    for (const key in nextProps) {
        if (nextProps[key] !== prevProps[key]) {
            return true;
        }
    }
    return false;
}

const queue = [];
let isFlushPending = false;
const p = Promise.resolve();
function nextTick(fn) {
    return fn ? p.then(fn) : p;
}
function queueJobs(job) {
    if (isFlushPending)
        return;
    isFlushPending = true;
    if (!queue.includes(job)) {
        queue.push(job);
    }
    nextTick(() => {
        isFlushPending = false;
        let job;
        while (job = queue.shift()) {
            job && job();
        }
    });
}

function createRenderer(options) {
    const { createElement: hostCreateElement, patchProp: hostPatchProp, insert: hostInsert, remove: hostRemove, setElementText: hostSetElementText } = options;
    function render(vnode, container) {
        // patch
        patch(null, vnode, container, null, null);
    }
    // n1 代表老虚拟dom n2 代表新的虚拟节点 n1 不存在就是初始化
    function patch(n1, n2, container, parentComponent, anchor) {
        const { type, shapeFlag } = n2;
        switch (type) {
            case Fragment:
                processFragment(n1, n2, container, processFragment, anchor);
                break;
            case Text:
                processText(n1, n2, container);
                break;
            default:
                // 判断 vnode 类型
                if (shapeFlag & 1 /* ELEMENT */) {
                    processElement(n1, n2, container, parentComponent, anchor);
                }
                else if (shapeFlag & 2 /* STATEFUL_COMPONENT */) {
                    // 根据不同类型来处理不同的虚拟节点
                    processComponent(n1, n2, container, parentComponent, anchor);
                }
                break;
        }
    }
    function processText(n1, n2, container) {
        const { children } = n2;
        const textNode = (n2.el = document.createTextNode(children));
        container.append(textNode);
    }
    function processFragment(n1, n2, container, parentComponent, anchor) {
        mountChildren(n2.children, container, parentComponent, anchor);
    }
    function processComponent(n1, n2, container, parentComponent, anchor) {
        if (!n1) {
            mountComponent(n2, container, parentComponent, anchor);
        }
        else {
            updateComponent(n1, n2);
        }
    }
    function updateComponent(n1, n2) {
        if (shouldUpdateComponent(n1, n2)) {
            const instance = n2.component = n1.component;
            instance.next = n2;
            instance.update();
        }
    }
    function processElement(n1, n2, container, parentComponent, anchor) {
        if (!n1) {
            mountElement(n2, container, parentComponent, anchor);
        }
        else {
            patchElement(n1, n2, container, parentComponent, anchor);
        }
    }
    function patchElement(n1, n2, container, parentComponent, anchor) {
        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        const el = (n2.el = n1.el);
        patchProps(el, oldProps, newProps);
        patchChildren(n1, n2, el, parentComponent, anchor);
    }
    function patchChildren(n1, n2, container, parentComponent, anchor) {
        const prevShapeFlag = n1.shapeFlag;
        const c1 = n1.children;
        const { shapeFlag } = n2;
        const c2 = n2.children;
        if (shapeFlag & 4 /* TEXT_CHILDREN */) {
            if (prevShapeFlag & 8 /* ARRAY_CHILDREN */) { // 老节点是Array就清空
                // 删除子节点
                unmountChildren(n1.children);
            }
            if (c1 !== c2) { // 清空过后的老节点或者是文本节点
                // 设置text
                hostSetElementText(container, c2);
            }
        }
        else { // 新节点是数组
            if (prevShapeFlag & 4 /* TEXT_CHILDREN */) { // 老节点是文本节点
                hostSetElementText(container, '');
                mountChildren(c2, container, parentComponent, anchor); // 挂载新节点
            }
            else { // 新老节点都是数组
                patchKeyedChildren(c1, c2, container, parentComponent, anchor);
            }
        }
    }
    function patchKeyedChildren(c1, c2, container, parentComponent, parentAnchor) {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1;
        let e2 = l2 - 1;
        function isSomeVNodeType(n1, n2) {
            return n1.type === n2.type && n1.key === n2.key;
        }
        // 左侧
        while (i <= e1 && i <= e2) {
            const n1 = c1[i];
            const n2 = c2[i];
            if (isSomeVNodeType(n1, n2)) {
                patch(n1, n2, container, parentComponent, parentAnchor);
            }
            else {
                break;
            }
            i++;
        }
        // 右侧
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1];
            const n2 = c2[e2];
            if (isSomeVNodeType(n1, n2)) {
                patch(n1, n2, container, parentComponent, parentAnchor);
            }
            else {
                break;
            }
            e1--;
            e2--;
        }
        // 新的比老的多
        if (i > e1) {
            // 当出现 i 大于 e1 的时候
            // 有可能是 i 增加 e1 减小 也就是 元素新增在右边
            // 也有可能是 i 不增加即等于0 但是 e1 减小到为负数 元素增加在左边
            if (i <= e2) {
                const nextPos = e2 + 1;
                let anchor = nextPos < l2 ? c2[nextPos].el : null;
                while (i <= e2) {
                    patch(null, c2[i], container, parentComponent, anchor);
                    i++;
                }
            }
        }
        else if (i > e2) { // 老的比新的多
            while (i <= e1) {
                hostRemove(c1[i].el);
                i++;
            }
        }
        else { // 中间对比
            let s1 = i;
            let s2 = i;
            const toBePatched = e2 - s2 + 1;
            let patched = 0;
            const keyToNewIndexMap = new Map();
            const newIndexToOldIndexMap = new Array(toBePatched).fill(0);
            let moved = false, maxNewIndexSoFar = 0;
            for (let i = s2; i <= e2; i++) {
                const nextChild = c2[i];
                keyToNewIndexMap.set(nextChild.key, i);
            }
            for (let i = s1; i <= e1; i++) {
                const prevChild = c1[i];
                if (patched >= toBePatched) {
                    hostRemove(prevChild.el);
                    continue;
                }
                let newIndex;
                if (prevChild.key) {
                    newIndex = keyToNewIndexMap.get(prevChild.key);
                }
                else {
                    for (let j = s2; j <= e2; j++) {
                        if (isSomeVNodeType(prevChild, c2[j])) {
                            newIndex = j;
                            break;
                        }
                    }
                }
                if (newIndex === undefined) { // 老节点在新节点里面不存在
                    hostRemove(prevChild.el);
                }
                else { // 老节点在新节点里面存在故是更新逻辑，不需要锚点
                    if (newIndex >= maxNewIndexSoFar) {
                        maxNewIndexSoFar = newIndex;
                    }
                    else {
                        moved = true;
                    }
                    newIndexToOldIndexMap[newIndex - s2] = i + 1;
                    patch(prevChild, c2[newIndex], container, parentComponent, null);
                    patched++;
                }
            }
            const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : [];
            let j = increasingNewIndexSequence.length - 1;
            for (let i = toBePatched - 1; i >= 0; i--) {
                const nextIndex = i + s2;
                const nextChild = c2[nextIndex];
                const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : null;
                if (newIndexToOldIndexMap[i] === 0) {
                    // 新增节点
                    patch(null, nextChild, container, parentComponent, anchor);
                }
                else if (moved) {
                    if (j < 0 || i !== increasingNewIndexSequence[j]) {
                        hostInsert(nextChild.el, container, anchor);
                    }
                    else {
                        j--;
                    }
                }
            }
        }
    }
    function patchProps(el, oldProps, newProps) {
        if (oldProps !== newProps) {
            for (const key in newProps) {
                const prevProp = oldProps[key];
                const nextProp = newProps[key];
                if (prevProp !== nextProp) {
                    hostPatchProp(el, key, prevProp, nextProp);
                }
            }
            if (oldProps !== EMPTY_OBJ) {
                for (const key in oldProps) {
                    if (!(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null);
                    }
                }
            }
        }
    }
    function unmountChildren(children) {
        for (let i = 0; i < children.length; i++) {
            const el = children[i].el;
            // remove
            hostRemove(el);
        }
    }
    function mountComponent(vnode, container, parentComponent, anchor) {
        const instance = (vnode.component = createComponentInstance(vnode, parentComponent));
        setUpcomponent(instance);
        setupRenderEffect(instance, vnode, container, anchor);
        // return instance
    }
    function mountElement(vnode, container, processFragment, anchor) {
        const { type, children, shapeFlag, props } = vnode;
        const el = (vnode.el = hostCreateElement(type));
        // string
        if (shapeFlag & 4 /* TEXT_CHILDREN */) {
            el.textContent = children;
        }
        else if (shapeFlag & 8 /* ARRAY_CHILDREN */) {
            mountChildren(vnode.children, el, processFragment, anchor);
        }
        // props
        for (const key in props) {
            const val = props[key];
            hostPatchProp(el, key, null, val);
        }
        // container.append(el)
        hostInsert(el, container, anchor);
    }
    function mountChildren(children, container, parentComponent, anchor) {
        children.forEach((v) => {
            patch(null, v, container, parentComponent, anchor);
        });
    }
    function setupRenderEffect(instance, vnode, container, anchor) {
        instance.update = effect(() => {
            if (!instance.isMounted) {
                //init
                const { proxy } = instance;
                const subTree = (instance.subTree = instance.render.call(proxy));
                patch(null, subTree, container, instance, anchor);
                // element -> mount
                vnode.el = subTree.el;
                instance.isMounted = true;
            }
            else {
                // update
                const { proxy, vnode, next } = instance;
                if (next) {
                    next.el = vnode.el;
                    updateComponentPreRender(instance, next);
                }
                const subTree = instance.render.call(proxy);
                const prevSubTree = instance.subTree;
                instance.subTree = subTree;
                patch(prevSubTree, subTree, container, instance, anchor);
            }
        }, {
            scheduler() {
                queueJobs(instance.update);
            }
        });
    }
    return {
        createApp: createAppAPI(render)
    };
}
function updateComponentPreRender(instance, nextVnode) {
    instance.vnode = nextVnode;
    instance.next = null;
    instance.props = nextVnode.props;
}
function getSequence(arr) {
    const p = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
            j = result[result.length - 1];
            if (arr[j] < arr[i]) {
                p[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while (u < v) {
                c = (u + v) >> 1;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                }
                else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = 1;
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}

function createElement(type) {
    return document.createElement(type);
}
function patchProp(el, key, preVal, nextVal) {
    const isOn = (key) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
        const event = key.slice(2).toLowerCase();
        el.addEventListener(event, nextVal);
    }
    else {
        if (nextVal === undefined || nextVal === null) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, nextVal);
        }
    }
}
function insert(child, container, anchor) {
    container.insertBefore(child, anchor || null);
}
function remove(child) {
    const parent = child.parentNode;
    if (parent) {
        parent.removeChild(child);
    }
}
function setElementText(el, text) {
    el.textContent = text;
}
const renderer = createRenderer({
    createElement,
    patchProp,
    insert,
    remove,
    setElementText
});
function createApp(...args) {
    return renderer.createApp(...args);
}

exports.createApp = createApp;
exports.createRenderer = createRenderer;
exports.createTextVNode = createTextVNode;
exports.getCurrentInstance = getCurrentInstance;
exports.h = h;
exports.inject = inject;
exports.nextTick = nextTick;
exports.provide = provide;
exports.proxyRefs = proxyRefs;
exports.ref = ref;
exports.renderSlots = renderSlots;
