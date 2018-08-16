
function transformArrayToObject(arr=[], keyName){
    const obj = {};
    for(let item of arr){
        let index = arr.indexOf(item)
        obj[`${keyName}[${index}]`] = item 
    }
    return obj
}
