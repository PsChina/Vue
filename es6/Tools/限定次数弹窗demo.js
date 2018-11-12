// 这是一个 24小时内，弹两次框 0点到12点，12点到24点的需求。

function is0_12(date) { // 判断一个字符串时间戳 是否在当天的 00 - 12 点
    let _00 = new Date().setHours(0) // 当天 00 点
    let _12 = new Date().setHours(12) // 当天 12 点
    let time = new Date(Number(date)).getTime() // 传入的时间
    return _00 <= time && _12 > time // 传入的时间是否在 00-12 点之间 是为 true 否 为 false
}

function is12_24(date) { // 判断一个字符串时间戳 是否在当天的 12 - 24 点
    let _12 = new Date().setHours(12) // 当天 12 点
    let _24 = new Date().setHours(24) // 当天 24 点
    let time = new Date(Number(date)).getTime() // 传入的时间
    return _12 <= time && _24 > time // 传入的时间是否在 12-24 点之间 是为 true 否 为 false
}

function setCookie(name,value,days) { // setCookie 这个没什么好说的
    let exp = new Date();
    exp.setTime(exp.getTime() + days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) { // getCookie 这个没什么好说的
    let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}

function whenPageOpened(){ // 当页面被打开的时候
    let lastPopUpedTime = getCookie('lastPopUpedTime')
    let now = new Date().getTime()

    if( is0_12(now) ) { // 现在是 0-12 点吗?
        if( !is0_12(lastPopUpedTime) ) { // 当天的 0-12 点 没有谈过窗
            popUp() // 弹窗
        }
    } else { // 现在是 12-24 点
        if( !is12_24(lastPopUpedTime) ) { // 当天的 12-24 点 没有谈过窗
            popUp() // 弹窗
        }
    }
}

function popUp(){ // 弹窗
    console.log('弹窗')
    setCookie('lastPopUpedTime',new Date().getTime(), 0.5) // 保存当前时间 过期时间是半天
}



whenPageOpened()