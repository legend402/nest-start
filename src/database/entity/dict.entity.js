"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DictDto = void 0;
var typeorm_1 = require("typeorm");
var DictDto = /** @class */ (function () {
    function DictDto() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('rowid')
    ], DictDto.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            comment: '字典项名称'
        })
    ], DictDto.prototype, "dictName");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            comment: '字典项值'
        })
    ], DictDto.prototype, "dictCode");
    __decorate([
        (0, typeorm_1.Column)({
            comment: '字典描述'
        })
    ], DictDto.prototype, "dictDesc");
    __decorate([
        (0, typeorm_1.Column)({
            comment: '当前字典组给子项的父级id'
        })
    ], DictDto.prototype, "pid");
    DictDto = __decorate([
        (0, typeorm_1.Entity)()
    ], DictDto);
    return DictDto;
}());
exports.DictDto = DictDto;
