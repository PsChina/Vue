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
var Seasoning = /** @class */ (function () {
    function Seasoning() {
    }
    return Seasoning;
}());
var Coffee = /** @class */ (function (_super) {
    __extends(Coffee, _super);
    function Coffee() {
        var _this = _super.call(this) || this;
        _this.price = 8;
        return _this;
    }
    Coffee.prototype.cost = function () {
        return this.price;
    };
    return Coffee;
}(Seasoning));
var MilkFoam = /** @class */ (function (_super) {
    __extends(MilkFoam, _super);
    function MilkFoam() {
        var _this = _super.call(this) || this;
        _this.price = 5;
        return _this;
    }
    MilkFoam.prototype.cost = function () {
        return this.price;
    };
    return MilkFoam;
}(Seasoning));
var Milk = /** @class */ (function (_super) {
    __extends(Milk, _super);
    function Milk() {
        var _this = _super.call(this) || this;
        _this.price = 10;
        return _this;
    }
    Milk.prototype.cost = function () {
        return this.price;
    };
    return Milk;
}(Seasoning));
var Mocha = /** @class */ (function (_super) {
    __extends(Mocha, _super);
    function Mocha() {
        var _this = _super.call(this) || this;
        _this.price = 15;
        return _this;
    }
    Mocha.prototype.cost = function () {
        return this.price;
    };
    return Mocha;
}(Seasoning));
var Beverage = /** @class */ (function () {
    function Beverage() {
        this.price = 10; // 初始价格10块
        this.seasoningList = []; // 默认不加任何调料
    }
    Beverage.prototype.cost = function () {
        var currentPrice = this.price;
        this.seasoningList.forEach(function (season) {
            currentPrice += season.cost();
        });
        return currentPrice;
    };
    Beverage.prototype.setSeasoning = function (seasoning) {
        this.seasoningList.push(seasoning);
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
        return _this;
    }
    return Cappuccino;
}(Beverage));
var cappuccino = new Cappuccino(); // 有人点了一杯卡布奇诺 
// 加咖啡
var coffee = new Coffee();
cappuccino.setSeasoning(coffee);
// 加牛奶
var milk = new Milk();
cappuccino.setSeasoning(milk);
// 计算价格 
cappuccino.cost(); // 28
