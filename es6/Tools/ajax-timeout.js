function myAjax(obj,overTime){
	const httpRequest = new XMLHttpRequest();
	httpRequest.open( obj.method, obj.url, true )
	const startTime = (new Date()).getTime();
	const timmer = setInterval(()=>{
			if( myAjax.timeIsOver(startTime,overTime||obj.overTime) ){
				if(obj.timeOut){
					// httpRequest.abort() // 自动关闭网路请求
					obj.timeOut(httpRequest) //如果超时调用timeout函数
				}
			}
	}, 10);
	
	httpRequest.onreadystatechange = function(){
		if(this.readyState!==4){ // 当网络请求完成到第四步
			return
		}
		clearInterval(timmer);
		if(this.status===200){ // 并且状态为200 成功的时候
			if(obj.success){
				obj.success(this.response) //调用成功的回调			
			}
		}else if(obj.error&&this.status>399){
			if(obj.error){
				obj.error(this.responseText) // 否则调用失败的
			}
	}
	}
	if( typeof obj.data === 'object' ) {
		obj.data = myAjax.formatData(obj.data)
	}
	httpRequest.send(obj.data);
}


myAjax.timeIsOver = (startTime, overTime)=>{
	const currentTime = (new Date()).getTime()
	return currentTime-startTime >= overTime // 当前时间减去 网路请求开始的时间 大于等于 超时时间 则判断为超时
}

myAjax.formatData = (data)=>{
	let dataStr = ''
	for(let key in data){
		dataStr += `${key}=${data[key]}&`
	}
	return dataStr.substring(0,dataStr.length-1)
}