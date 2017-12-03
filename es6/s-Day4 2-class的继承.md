# class的继承


```js
    class Div {  // 父类
        static setSize(_this,width,height){ //静态方法  你可以认为是类方法 也就是这个方法不会挂载在实例上 只能用类名调用 就像 String.fromCharCode 和 String.fromCodePoint 一样 这两个方法不存在 字符串实例 'Hello' 上
            _this.style.width = width + 'px';
            _this.style.height = height + 'px';
        }
        static setBg(_this,color){
            _this.style.background = color;
        }
        constructor(innerText = null) {

            this.ele = document.createElement('div');

            this[0] = this.ele;

            this.ele.innerText = innerText;
            
        }
        setBg(color){
            this[0].style.background = color;
        }
        
    }

    class myButton extends Div { // 子类 继承父类
        constructor(obj) {
            super();
            this[0].style.cursor = 'pointer'
            this[0].style.userSelect = 'none'
            this[0].setName = function (name) {
                this.innerText = name;
            }
            this[0].onclick = obj['click'];
            this[0].innerText = obj['name'];
        }
        
    }

    let button = new myButton({
        click: function () {
            console.log('按钮被按了');
        },
        name:'按钮1'
    });

    let button2 = new myButton({
        click: function () {
            console.log('我是button2')
        },
        name:'按钮2'
    })

    document.documentElement.appendChild(button[0]);
    let div = new Div('div');
    document.documentElement.appendChild(div[0]);
    document.documentElement.appendChild(button2[0]);
    button.setBg('orange');
    div.setBg('pink');
```