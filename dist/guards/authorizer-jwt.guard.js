"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizerJWT = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const permissions_decorator_1 = require("../decorators/permissions/permissions.decorator");
const public_decorator_1 = require("../decorators/public.decorator");
const check_permissions_helper_1 = require("../helpers/check-permissions.helper");
let AuthorizerJWT = class AuthorizerJWT {
    constructor(reflector, jwtService, configService, logger, apiKeysRepository, checkPermissionHelper) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = logger;
        this.apiKeysRepository = apiKeysRepository;
        this.checkPermissionHelper = checkPermissionHelper;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const { resource, method } = this.reflector.getAllAndOverride(permissions_decorator_1.PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]) || {};
        if (!resource || !method) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
        const token = authHeader.replace('Bearer ', '');
        let payload;
        const stage = this.configService.get('STAGE');
        const jwtDecode = this.jwtService.decode(token);
        const apikey = await this.apiKeysRepository.findById(jwtDecode.keyId);
        const { jwtSecretKey } = apikey;
        try {
            payload = await this.jwtService.verifyAsync(token, {
                secret: `${jwtSecretKey}-${stage}`,
            });
            request.identifier = payload.identifier;
            request.clientId = payload.application.id;
        }
        catch (error) {
            this.logger.error(error);
            if (error.message === 'jwt expired') {
                throw new common_1.ForbiddenException('the incoming token has expired');
            }
            throw new common_1.ForbiddenException('You do not have permission to access this resource');
        }
        const validateRoutes = this.configService.get("AUTH_VALIDATE_ROUTES");
        if (validateRoutes === true) {
            const hasPermission = this.checkPermissionHelper.validate(resource, method, payload.permissions);
            if (!hasPermission) {
                throw new common_1.ForbiddenException(`You do not have permission to access this resource '${String(method).toLocaleUpperCase()} /${resource}'`);
            }
        }
        return true;
    }
};
exports.AuthorizerJWT = AuthorizerJWT;
exports.AuthorizerJWT = AuthorizerJWT = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)("ApiKeyRepository")),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        config_1.ConfigService,
        common_1.Logger, Object, check_permissions_helper_1.CheckPermissionsHelper])
], AuthorizerJWT);
