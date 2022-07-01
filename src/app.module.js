"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var logger_middleware_1 = require("./common/middleware/logger.middleware");
var auth_module_1 = require("./logical/auth/auth.module");
var database_module_1 = require("./database/database.module");
var user_controller_1 = require("./controllers/userController/user.controller");
var core_1 = require("@nestjs/core");
var transform_1 = require("./logical/interceptor/transform");
var http_exception_filter_1 = require("./logical/filters/http-exception.filter");
var any_exception_filter_1 = require("./logical/filters/any-exception.filter");
var typeorm_exception_filter_1 = require("./logical/filters/typeorm-exception.filter");
var user_module_1 = require("./controllers/userController/user.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            controllers: [user_controller_1.UserController],
            providers: [
                {
                    provide: core_1.APP_FILTER,
                    useClass: http_exception_filter_1.HttpExceptionFilter
                },
                {
                    provide: core_1.APP_FILTER,
                    useClass: any_exception_filter_1.AllExceptionsFilter
                },
                {
                    provide: core_1.APP_FILTER,
                    useClass: typeorm_exception_filter_1.QueryFailedExceptionFilter
                },
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: transform_1.TransformInterceptor
                },
            ],
            imports: [user_module_1.UserModule, auth_module_1.AuthModule, database_module_1.DatabaseModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
