"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DictItemDto = void 0;
var typeorm_1 = require("typeorm");
var DictItemDto = /** @class */ (function () {
    function DictItemDto() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('rowid')
    ], DictItemDto.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            comment: '字典值'
        })
    ], DictItemDto.prototype, "value");
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true,
            comment: '中文名称'
        })
    ], DictItemDto.prototype, "label");
    __decorate([
        (0, typeorm_1.Column)({
            comment: '当前组的父级id'
        })
    ], DictItemDto.prototype, "pid");
    __decorate([
        (0, typeorm_1.Column)({
            comment: '排序'
        })
    ], DictItemDto.prototype, "sort");
    __decorate([
        (0, typeorm_1.Column)({
            "default": '',
            comment: '备注'
        })
    ], DictItemDto.prototype, "desc");
    __decorate([
        (0, typeorm_1.Column)({
            "default": 1,
            comment: '状态 1:启用 0:禁用'
        })
    ], DictItemDto.prototype, "status");
    DictItemDto = __decorate([
        (0, typeorm_1.Entity)()
    ], DictItemDto);
    return DictItemDto;
}());
exports.DictItemDto = DictItemDto;
