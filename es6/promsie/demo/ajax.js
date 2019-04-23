function ajax({ method, url, data, success = () => null, error = () => null, headers, async = true, timeout, ontimeout }) {

    const req = new XMLHttpRequest()

    if (headers) {
        for(const [key,value] of Object.entries(headers)){
            req.setRequestHeader(key,value)
        }        
    }

    req.open(method, url, async)

    req.onreadystatechange = function () {

        const { readyState, status, responseText } = this

        if (readyState !== 4) return

        if (status === 304 || (status >= 200 && status < 300) ) {
            success(responseText)
        } else {
            error(responseText)
        }
    }

    req.timeout = timeout

    req.ontimeout = ontimeout

    req.send( JSON.stringify(data) )

}