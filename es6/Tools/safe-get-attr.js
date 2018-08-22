export default (obj, ...rest) => { // 这是一个安全获取属性的函数
    if(!rest[0]){
        return
    }
    let t
    let code = '(t=obj[rest[0]])&&'
    for(let i=1; i<rest.length ; i++){
        let key = rest[i]
        code += `(${t=t[key]})&&`
    }
    eval(code.substring(0,code.length-2))
    return t
}
// 例如
/*
import safeGetAttr from 'safe-get-attr'

const obj = {
    leve1:{
        value:'1',
        leve2:{
            value:'2',
            leve3:{
                value:'3'
            }
        }
    }
}
let value = safeGetAttr(obj,'leve1','leve2','leve3','value')
// value === '3'

value = safeGetAttr(obj,'leve1','leve2','leve3', 'leve4', 'value')
// value === undefined 但是不会报错
*/
