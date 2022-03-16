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

export function mountElement(vNode, container) {
    if (typeof vNode === 'string') {
        container.append(vNode)
        return
    }
    const { type, props, children } = vNode;
    const el = vNode.el = document.createElement(type);
    for (let key in props) {
        patchProp(el, key, null, vNode.props[key]);
    }
    if (typeof children === 'string') {
        el.append(children);
    } else if (Array.isArray(children)) {
        for (const child of children) {
            mountElement(child, el);
        }
    }
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

    const { children: oldChildren = [] } = n1
    const { children: newChildren = [] } = n2

    const sameLength = Math.min(oldChildren.length, newChildren.length)

    const length = Math.max(oldChildren.length, newChildren.length)

    // 不同的替换
    for (let i = 0; i < sameLength; i++) {
        const oldChildrenItem = oldChildren[i],
            newChildrenItem = newChildren[i];
        if (typeof newChildrenItem === 'string') {
            if (typeof oldChildrenItem === 'string') {
                if (oldChildrenItem !== newChildrenItem) {
                    el.replaceChild(document.createTextNode(newChildrenItem), el.childNodes[i])
                }
            } else {
                el.replaceChild(document.createElement(newChildrenItem), el.childNodes[i])
            }
        } else {
            diff(oldChildrenItem[i], newChildrenItem[i])
        }
    }
    // 新的比老的多就渲染
    for (let i = sameLength; i < length; i++) {
        mountElement(newChildren[i], el)
    }


}