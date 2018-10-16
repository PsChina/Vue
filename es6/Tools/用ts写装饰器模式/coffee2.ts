class Coffee { // 咖啡
    public price
    constructor(){
        this.price = 8
    }
    cost(){
        return this.price
    }
}
class MilkFoam { // 奶泡
    public price
    constructor(){
        this.price = 5
    }
    cost(){
        return this.price
    }
}
class Milk { // 牛奶
    public price
    constructor(){
        this.price = 10
    }
    cost(){
        return this.price
    }
}
class Mocha { // 摩卡
    public price
    constructor(){
        this.price = 15
    }
    cost(){
        return this.price
    }
}

abstract class Beverage { // 饮料
    public description: string
    public coffee: Coffee
    public milkFoam : MilkFoam
    public milk: Milk
    public mocha: Mocha
    public price: number
    constructor(){
        this.coffee = null // 没有咖啡
        this.milkFoam = null // 没有奶泡
        this.milk = null // 没有牛奶
        this.mocha = null // 没有摩卡
        this.price = 10 // 初始价格10块
    }
    cost(){ // 计算各种原料的总价
        if(this.coffee instanceof Coffee){
            this.price += this.coffee.cost() 
        }
        if(this.milkFoam instanceof MilkFoam){
            this.price += this.milkFoam.cost()
        }
        if(this.milk instanceof Milk){
            this.price += this.milk.cost()
        }
        if(this.mocha instanceof Mocha){
            this.price += this.mocha.cost()
        }
        return this.price
    }
    setCoffee(coffee:Coffee){ // 设置咖啡
        this.coffee = coffee
    }
    setMilkFoam(milkFoam:MilkFoam){ // 设置 奶泡
        this.milkFoam = milkFoam
    }
    setMike(milk:Milk){ // 设置 牛奶
        this.milk = milk
    }
    setMocha(mocha:Mocha){ // 设置 摩卡
        this.mocha = mocha
    }
    getDescription(){ // 获取描述信息
        return this.description
    }
}

class Cappuccino extends Beverage {
    constructor(){
        super()
        this.description = '在玻璃杯中加入咖啡制成的冰块，倒入加糖煮沸的牛奶，从上面慢慢注入冰冻咖啡，这时牛奶和咖啡分成两层。牛奶泡沫在最上层。'
        this.setMike(new Milk())
        this.setCoffee(new Coffee())
        this.setMilkFoam(new MilkFoam())
    }
}



let cappuccino = new Cappuccino () // 有人点了一杯卡布奇诺

cappuccino.cost() // 33