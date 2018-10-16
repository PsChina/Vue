
abstract class Seasoning{ // 抽象基类-调料
    public abstract price:number
    public abstract cost():number
}
class Coffee extends Seasoning{ // 咖啡
    public price
    constructor(){
        super()
        this.price = 8
    }
    cost(){
        return this.price
    }
}
class MilkFoam extends Seasoning{ // 奶泡
    public price
    constructor(){
        super()
        this.price = 5
    }
    cost(){
        return this.price
    }
}
class Milk extends Seasoning { // 牛奶
    public price
    constructor(){
        super()
        this.price = 10
    }
    cost(){
        return this.price
    }
}
class Mocha extends Seasoning{ // 摩卡
    public price
    constructor(){
        super()
        this.price = 15
    }
    cost(){
        return this.price
    }
}

abstract class Beverage { // 饮料
    public description: string
    public price: number
    public seasoningList: Array<Seasoning>
    constructor(){
        this.price = 10 // 初始价格10块
        this.seasoningList = [] // 默认不加任何调料
    }
    cost(){ // 计算各种原料的总价
        let currentPrice = this.price
        this.seasoningList.forEach(season => {
            currentPrice += season.cost()
        });
        return currentPrice
    }
    setSeasoning(seasoning:Seasoning){ // 设置咖啡
        this.seasoningList.push(seasoning)
    }
    getDescription(){ // 获取描述信息
        return this.description
    }
}

class Cappuccino extends Beverage {
    constructor(){
        super()
        this.description = '在玻璃杯中加入咖啡制成的冰块，倒入加糖煮沸的牛奶，从上面慢慢注入冰冻咖啡，这时牛奶和咖啡分成两层。牛奶泡沫在最上层。'
    }
}


let cappuccino = new Cappuccino () // 有人点了一杯卡布奇诺 

// 加咖啡

let coffee = new Coffee()

cappuccino.setSeasoning(coffee)

// 加牛奶

let milk = new Milk()

cappuccino.setSeasoning(milk)

// 计算价格 

cappuccino.cost() // 28