abstract class Coffee {
    public milkFoam : boolean
    public milk: boolean
    public mocha: boolean
    public $milkFoam: number
    public $milk: number
    public $mocha: number
    constructor(){
        this.milkFoam = false // 是否含有奶泡
        this.milk = false // 是否含有牛奶
        this.mocha = false // 是否含有摩卡
        this.$milkFoam = 10 // 奶泡价格
        this.$milk = 20 // 牛奶价格
        this.$mocha = 30 // 摩卡价格
    }
    cost(){ // 计算各种原料的总价
        return Number(this.milkFoam) * this.$milkFoam + Number(this.milk) * this.$milk + Number(this.mocha) * this.$mocha
    }
    hasSoybeanMilk(val){ // 一杯奶茶是否含 (奶泡)
        this.milkFoam = val
    }
    hasMilk(val){ // 一杯奶茶是否含有 (牛奶)
        this.milk = val
    }
    hasMocha(val){ // 一杯奶茶是否含有 (摩卡)
        this.mocha = val
    }
}

class Cappuccino extends Coffee { // 卡布奇诺
    constructor(){
        super()
    }
    public cost(){
        return super.cost() + 10 // 卡布奇诺比原味贵10块
    }
}

class Latte extends Coffee { // 卡布奇诺
    constructor(){
        super()
    }
    public cost(){
        return super.cost() + 8 // 拿铁比原味贵8块
    }
}

const cappuccino = new Cappuccino() // 有人点了一杯 卡布奇诺

cappuccino.hasMilk(true) // 说要加 牛奶 不加豆浆和摩卡

const $cappuccio = cappuccino.cost() // 卡布奇诺 的价格

console.log($cappuccio) // 30 块