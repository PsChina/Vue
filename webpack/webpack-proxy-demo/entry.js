var axios = require('axios')
var body = document.querySelector('body')

axios({
    url:'/api/ssm-rest-ws/rest/ws/webmecter/getWebMecterCodeByProAndCity/pro=%E7%A6%8F%E5%BB%BA&city=%E5%8E%A6%E9%97%A8&county=%E5%8E%A6%E9%97%A8%E5%B8%82%E5%B8%82%E8%BE%96%E5%8C%BA&indexName=GDZB#'
}).then(function (res) {
    console.log(res)
    body.innerHTML = JSON.stringify(res.data)
})

console.log(body)
