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
var app_controller_1 = require("./controllers/appController/app.controller");
var app_service_1 = require("./controllers/appController/app.service");
var cat_controller_1 = require("./controllers/catController/cat.controller");
var cat_service_1 = require("./controllers/catController/cat.service");
var auth_service_1 = require("./logical/auth/auth.service");
var auth_module_1 = require("./logical/auth/auth.module");
var database_module_1 = require("./database/database.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('');
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            controllers: [app_controller_1.AppController, cat_controller_1.CatController],
            providers: [app_service_1.AppService, cat_service_1.CatsService, auth_service_1.AuthService],
            imports: [auth_module_1.AuthModule, database_module_1.DatabaseModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
