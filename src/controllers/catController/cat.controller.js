"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CatController = void 0;
var common_1 = require("@nestjs/common");
var CatController = /** @class */ (function () {
    function CatController(catService) {
        this.catService = catService;
    }
    CatController.prototype.getCatById = function (id) {
        console.log(id);
        return this.catService.findOne(id);
    };
    CatController.prototype.getAll = function () {
        return this.catService.findAll();
    };
    CatController.prototype.addCat = function (cat) {
        return this.catService.create(cat);
    };
    CatController.prototype.editCat = function (id, cat) {
        return this.catService.editCat(id, cat);
    };
    CatController.prototype["delete"] = function (id) {
        this.catService.remove(id);
    };
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, common_1.Query)('id'))
    ], CatController.prototype, "getCatById");
    __decorate([
        (0, common_1.Get)('all')
    ], CatController.prototype, "getAll");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], CatController.prototype, "addCat");
    __decorate([
        (0, common_1.Put)(),
        __param(0, (0, common_1.Query)('id')),
        __param(1, (0, common_1.Body)())
    ], CatController.prototype, "editCat");
    __decorate([
        (0, common_1.Delete)(),
        __param(0, (0, common_1.Query)('id'))
    ], CatController.prototype, "delete");
    CatController = __decorate([
        (0, common_1.Controller)('cat')
    ], CatController);
    return CatController;
}());
exports.CatController = CatController;
