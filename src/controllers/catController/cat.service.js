"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CatsService = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var CatsService = /** @class */ (function () {
    function CatsService() {
        this.cats = [];
    }
    CatsService.prototype.create = function (cat) {
        var id = (0, crypto_1.randomUUID)();
        var newCat = __assign(__assign({}, cat), { id: id });
        this.cats.push(newCat);
        return newCat;
    };
    CatsService.prototype.findOne = function (id) {
        return this.cats.find(function (item) { return item.id === id; });
    };
    CatsService.prototype.findAll = function () {
        return this.cats;
    };
    CatsService.prototype.remove = function (id) {
        var index = this.cats.findIndex(function (item) { return item.id === id; });
        this.cats.splice(index, 1);
    };
    CatsService.prototype.editCat = function (id, cat) {
        var index = this.cats.findIndex(function (item) { return item.id === id; });
        this.cats[index] = Object.assign(this.cats[index], cat);
        return this.cats[index];
    };
    CatsService = __decorate([
        (0, common_1.Injectable)()
    ], CatsService);
    return CatsService;
}());
exports.CatsService = CatsService;
