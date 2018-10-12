function assign(){
    var e = arguments[0]
    for(var t=1;t<arguments.length;t++){
        var n=arguments[t];
        for(var r in n){
            Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])
        }
    }
    return e
}

if(!Object.assign){
    Object.assign = assign
}

