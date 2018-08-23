const safeGetAttr = (obj , ...rest) => { // 这是一个尾调函数 （递归内存消耗大 采用尾递归优化）
    if(!rest[0]){ // 如果没有属性名，则返回原来的值。
        return obj
    }
    if(typeof obj !== 'object'&&rest[0]){ // 如果要取值的对象不为 object（Object Array 等）并且还要取子属性。

        if(typeof obj === 'string' && rest[0]==='length'){ // 那就只有类型为 string 的值下面有个 length。
            return obj.length
        }
        return undefined // 否则就是未定义
        
    }
    const key = rest.splice(0,1) // 拿到第一层要取的属性名并且将它在属性列表内删除。
    const value = obj[key] // 根据属性取值。
    return safeGetAttr.apply(null, [value].concat(rest)) // 接着拿下一个属性。
}

export default safeGetAttr
