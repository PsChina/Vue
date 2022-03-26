function createElement(type) {
    return document.createElement(type)
}

function patchProp(el, key, preValue, nextValue) {
    if (!nextValue) {
        el.removeAttribute(key)
    } else {
        if (key.startsWith('on')) {
            const eventName = key.slice(2).toLocaleLowerCase()
            el.addEventListener(eventName, nextValue)
        } else {
            el.setAttribute(key, nextValue)
        }
    }
}

function createDomWithVNode(vNode) {
    const { type, props, children } = vNode;
    // 处理 tagName 
    const el = document.createElement(type)
    // 虚拟dom 和真实dom 是一一对应的
    vNode.el = el
    // 处理 props
    for (const key in props) {
        patchProp(el, key, null, props[key])
    }
    // 处理子节点
    if (typeof children === 'string') {
        el.append(children)
    } else {
        for (const vNode of children) {
            mountElement(vNode, el)
        }
    }
    return el
}

export function mountElement(vNode, container) {
    if (typeof vNode === 'string') {
        container.append(vNode)
        return
    }
    const el = createDomWithVNode(vNode)
    container.append(el);
}

// n1:oldVNode
// n2:newVNode
export function diff(n1 = {}, n2 = {}) {
    const el = n2.el = n1.el;
    if (n1.type !== n2.type) {
        // 处理 type 和 props
        el.replaceWith(createElement(n2.type));
        for (const key in n2.props) {
            patchProp(el, key, null, n2.props[key]);
        }
    } else {
        // 处理props
        const { props: oldProps } = n1;
        const { props: newProps } = n2;
        // 多了的属性新增 不同的属性覆盖
        for (let key in newProps) {
            const newVal = newProps[key]
            const oldVal = oldProps[key]
            if (oldVal !== newVal) {
                patchProp(el, key, null, newVal)
            }
        }
        // 少了的属性删除
        for (let key in oldProps) {
            if (!(key in newProps)) {
                patchProp(el, key, null, undefined)
            }
        }
    }

    // 处理children 暴力法
    const { children: oldChildren } = n1,
        { children: newChildren } = n2;
    // 新增 删除 替换

    // 替换
    const minLngth = Math.min(oldChildren.length, newChildren.length)
    //const maxLength = Math.max(oldChildren.length, newChildren.length)
    if (typeof oldChildren === 'string') {
        if (typeof newChildren === 'string') {
            if (oldChildren !== newChildren) {
                el.textContent = newChildren
            }
        } else {
            for (let vnode of newChildren) {
                mountElement(vnode, el)
            }
        }
    } else {
        for (let i = 0; i < minLngth; i++) {
            const newVnode = newChildren[i],
                oldVnode = oldChildren[i];
            if (typeof oldVnode === 'string') {
                if (typeof newVnode === 'string') {
                    if (oldVnode !== newVnode) {
                        el.replaceChild(document.createTextNode(newVnode), el.childNodes[i])
                    }
                } else {
                    el.replaceChild(createDomWithVNode(newVnode), el.childNodes[i])
                }
            } else {
                diff(oldVnode, newVnode)
            }
        }
        for (let i = minLngth; i < newChildren.length; i++) {
            mountElement(newChildren[i], el)
        }
    }



}