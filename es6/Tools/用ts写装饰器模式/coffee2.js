var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Coffee = /** @class */ (function () {
    function Coffee() {
        this.price = 8;
    }
    Coffee.prototype.cost = function () {
        return this.price;
    };
    return Coffee;
}());
var MilkFoam = /** @class */ (function () {
    function MilkFoam() {
        this.price = 5;
    }
    MilkFoam.prototype.cost = function () {
        return this.price;
    };
    return MilkFoam;
}());
var Milk = /** @class */ (function () {
    function Milk() {
        this.price = 10;
    }
    Milk.prototype.cost = function () {
        return this.price;
    };
    return Milk;
}());
var Mocha = /** @class */ (function () {
    function Mocha() {
        this.price = 15;
    }
    Mocha.prototype.cost = function () {
        return this.price;
    };
    return Mocha;
}());
var Beverage = /** @class */ (function () {
    function Beverage() {
        this.coffee = null; // 没有咖啡
        this.milkFoam = null; // 没有奶泡
        this.milk = null; // 没有牛奶
        this.mocha = null; // 没有摩卡
        this.price = 10; // 初始价格10块
    }
    Beverage.prototype.cost = function () {
        if (this.coffee instanceof Coffee) {
            this.price += this.coffee.cost();
        }
        if (this.milkFoam instanceof MilkFoam) {
            this.price += this.milkFoam.cost();
        }
        if (this.milk instanceof Milk) {
            this.price += this.milk.cost();
        }
        if (this.mocha instanceof Mocha) {
            this.price += this.mocha.cost();
        }
        return this.price;
    };
    Beverage.prototype.setCoffee = function (coffee) {
        this.coffee = coffee;
    };
    Beverage.prototype.setMilkFoam = function (milkFoam) {
        this.milkFoam = milkFoam;
    };
    Beverage.prototype.setMike = function (milk) {
        this.milk = milk;
    };
    Beverage.prototype.setMocha = function (mocha) {
        this.mocha = mocha;
    };
    Beverage.prototype.getDescription = function () {
        return this.description;
    };
    return Beverage;
}());
var Cappuccino = /** @class */ (function (_super) {
    __extends(Cappuccino, _super);
    function Cappuccino() {
        var _this = _super.call(this) || this;
        _this.description = '在玻璃杯中加入咖啡制成的冰块，倒入加糖煮沸的牛奶，从上面慢慢注入冰冻咖啡，这时牛奶和咖啡分成两层。牛奶泡沫在最上层。';
        _this.setMike(new Milk());
        _this.setCoffee(new Coffee());
        _this.setMilkFoam(new MilkFoam());
        return _this;
    }
    return Cappuccino;
}(Beverage));
