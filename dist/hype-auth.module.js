"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HypeAuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HypeAuthModule = void 0;
const common_1 = require("@nestjs/common");
const authorizer_jwt_guard_1 = require("./guards/authorizer-jwt.guard");
let HypeAuthModule = HypeAuthModule_1 = class HypeAuthModule {
    static register(ApiKeyRepositoryProvider) {
        return {
            module: HypeAuthModule_1,
            providers: [ApiKeyRepositoryProvider, authorizer_jwt_guard_1.AuthorizerJWT],
            exports: [authorizer_jwt_guard_1.AuthorizerJWT],
        };
    }
};
exports.HypeAuthModule = HypeAuthModule;
exports.HypeAuthModule = HypeAuthModule = HypeAuthModule_1 = __decorate([
    (0, common_1.Module)({})
], HypeAuthModule);
