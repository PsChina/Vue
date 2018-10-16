class MilkyTea { // 奶茶基类
    constructor(){
        this.soybeanMilk = false // 是否含有豆浆
        this.milk = false // 是否含有牛奶
        this.mocha = false // 是否含有摩卡
        this.$soybeanMilk = 10 // 豆浆价格
        this.$milk = 20 // 牛奶价格
        this.$mocha = 30 // 摩卡价格
    }
    cost(){ // 计算各种原料的总价
        return Number(this.soybeanMilk) * this.$soybeanMilk + Number(this.milk) * this.$milk + Number(this.mocha) * this.$mocha
    }
    hasSoybeanMilk(val){ // 一杯奶茶是否含 (豆浆)
        this.soybeanMilk = val
    }
    hasMilk(val){ // 一杯奶茶是否含有 (牛奶)
        this.milk = val
    }
    hasMocha(val){ // 一杯奶茶是否含有 (摩卡)
        this.mocha = val
    }
}

class Cappuccino extends MilkyTea { //卡布奇诺
    constructor(){
        super()
    }
    cost(){ // 卡布奇诺的价格 等于基本原料加 10 块钱。
        return super.cost() + 10
    }
}

const cappuccino = new Cappuccino() // 有人点了一杯 卡布奇诺

cappuccino.hasMilk(true) // 说要加 牛奶 不加豆浆和摩卡

const $cappuccino = cappuccino.cost() // 卡布奇诺 的价格

console.log($cappuccino) // 30 块

