## Vue filter
Vue2.x 不提供内置过滤器 这在Vue1.x中是提供的

但是任然提供 自定义过滤器 这使得vue 更加的轻量

### Vue.filter

```js
    Vue.filter('uppercase',function(value){  //定义一个将字母转换成大写字母的过滤器
        return value.toUpperCase(); 
    })
    // 这里没有做程序健壮性处理 当value为字符串的时候工作 不是字符串则抛出一个错误 是正常的逻辑
```

### demo

这里提供少数的演示

其他的过滤器需要大家自己定义。

```js
    Vue.filter('lowercase',function(value){
        if(typeof value === 'string'){
            return value.toLowerCase();
        } else {
            throw 'Must be string data!'
        }        
    })

    Vue.filter('date', function (value, formatMode, country) {
  
        function formatTimeWithMode(time, mode, CTRY) {
            const date = new Date(time);
            const cnWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            const enWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const shortCnWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            const shortEnWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            mode = mode.replace(/y{1,4}|MM|dd|hh|mm|ss|E{1,4}/g, function (type) {

                switch (type) {

                    case 'MM':

                        return (date.getMonth() + 1).toString().padStart(2, '0');

                    case 'dd':

                        return date.getDate().toString().padStart(2, '0');

                    case 'hh':

                        return date.getHours().toString().padStart(2, '0');

                    case 'mm':

                        return date.getMinutes().toString().padStart(2, '0');

                    case 'ss':

                        return date.getSeconds().toString().padStart(2, '0');

                    default:

                        if (type.indexOf('y') !== -1) { //y{1,4}
                            const year = date.getFullYear();

                            return type.length <= 2 ? year % 100 : year;

                        } else { //E{1,4}
                            const week = date.getDay();

                            const weekMap = CTRY === 'cn'
                                ? [shortCnWeek[week], cnWeek[week]]
                                : [shortEnWeek[week], enWeek[week]]

                            return type.length <= 2 ? weekMap[0] : weekMap[1];

                        }
                }

            })

            return mode;
        }

        if (!value) {
            return ''
        } else if (typeof value === 'number') {
            if (typeof formatMode === 'string') {
                return formatTimeWithMode(value, formatMode, country)
            } else {
                throw Error('The format parameter must be a string')
                return ''
            }
        } else {
            throw new TypeError('Only types of time can be formatted')
            return ''
        }

    })
```