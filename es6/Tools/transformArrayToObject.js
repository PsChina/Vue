// 不去重
function transformArrayToObject(arr=[], keyName){
    const obj = {};
    const length = arr.length
    for(let i = 0; i<length; i++){
        obj[`${keyName}[${i}]`] = arr[i];
    }
    return obj
}
