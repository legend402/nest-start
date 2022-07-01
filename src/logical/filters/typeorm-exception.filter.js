"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QueryFailedExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var QueryFailedExceptionFilter = /** @class */ (function () {
    function QueryFailedExceptionFilter() {
    }
    QueryFailedExceptionFilter.prototype["catch"] = function (exception, host) {
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var request = ctx.getRequest();
        var url = request.url;
        var name = exception.name;
        response.status(common_1.HttpStatus.BAD_REQUEST).json({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "Service Error: ".concat(name),
            path: url,
            timestamp: new Date().toISOString()
        });
    };
    QueryFailedExceptionFilter = __decorate([
        (0, common_1.Catch)(typeorm_1.QueryFailedError, typeorm_1.EntityNotFoundError, typeorm_1.MustBeEntityError)
    ], QueryFailedExceptionFilter);
    return QueryFailedExceptionFilter;
}());
exports.QueryFailedExceptionFilter = QueryFailedExceptionFilter;
