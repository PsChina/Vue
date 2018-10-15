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
        this.milkFoam = false; // 是否含有奶泡
        this.milk = false; // 是否含有牛奶
        this.mocha = false; // 是否含有摩卡
        this.$milkFoam = 10; // 奶泡价格
        this.$milk = 20; // 牛奶价格
        this.$mocha = 30; // 摩卡价格
    }
    Coffee.prototype.cost = function () {
        return Number(this.milkFoam) * this.$milkFoam + Number(this.milk) * this.$milk + Number(this.mocha) * this.$mocha;
    };
    Coffee.prototype.hasSoybeanMilk = function (val) {
        this.milkFoam = val;
    };
    Coffee.prototype.hasMilk = function (val) {
        this.milk = val;
    };
    Coffee.prototype.hasMocha = function (val) {
        this.mocha = val;
    };
    return Coffee;
}());
var Cappuccino = /** @class */ (function (_super) {
    __extends(Cappuccino, _super);
    function Cappuccino() {
        return _super.call(this) || this;
    }
    Cappuccino.prototype.cost = function () {
        return _super.prototype.cost.call(this) + 10; // 卡布奇诺比原味贵10块
    };
    return Cappuccino;
}(Coffee));
var Latte = /** @class */ (function (_super) {
    __extends(Latte, _super);
    function Latte() {
        return _super.call(this) || this;
    }
    Latte.prototype.cost = function () {
        return _super.prototype.cost.call(this) + 8; // 拿铁比原味贵8块
    };
    return Latte;
}(Coffee));
var cappuccino = new Cappuccino(); // 有人点了一杯 卡布奇诺
cappuccino.hasMilk(true); // 说要加 牛奶 不加豆浆和摩卡
var $cappuccio = cappuccino.cost(); // 卡布奇诺 的价格
console.log($cappuccio); // 30 块
