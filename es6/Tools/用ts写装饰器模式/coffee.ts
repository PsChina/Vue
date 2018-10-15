abstract class Coffee { // 咖啡基类
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
    public abstract cost(): number
}

class Cappuccino extends Coffee { // 卡布奇诺
    constructor(){
        super()
        this.milk = true // 牛奶
    }
    public cost(){
        return Number(this.milk) * this.$milk + 10
    }
}

class Latte extends Coffee { // 拿铁
    constructor(){
        super()
        this.milkFoam = true // 奶泡
    }
    public cost(){
        return Number(this.milkFoam) * this.$milkFoam + 8
    }
}

// 这时假如客人变更要添加的调料哪我们需要定义很多不同的类比如 加了摩卡的卡布奇诺

class CappuccinoWithMocha extends Coffee{
    constructor(){
        super()
        this.milk = true // 牛奶
        this.mocha = true // 摩卡
    }
    public cost(){
        return Number(this.milk) * this.$milk + Number(this.mocha) * this.$mocha + 10
    }
}

// 这时无穷无尽的排列组合使得有定义不完的类而且维护起来也将是一个噩梦