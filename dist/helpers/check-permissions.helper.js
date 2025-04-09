"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPermissionsHelper = void 0;
const common_1 = require("@nestjs/common");
const resource_enum_1 = require("../enums/resource.enum");
let CheckPermissionsHelper = class CheckPermissionsHelper {
    validate(resource, method, permissions) {
        const pathToRegex = (path) => {
            const regexString = path
                .replace(/:[^\s/]+/g, '([^/]+)')
                .replace('*', '.*');
            return new RegExp(`^${regexString}$`);
        };
        for (const permission of permissions) {
            const regex = pathToRegex(permission.path);
            if (regex.test(resource)) {
                if (permission.method
                    .map((m) => m.toLowerCase())
                    .includes(method.toLowerCase()) &&
                    permission.type === resource_enum_1.ResourceTypeEnum.DENIED) {
                    return false;
                }
            }
        }
        for (const permission of permissions) {
            const regex = pathToRegex(permission.path);
            if (regex.test(resource)) {
                if (permission.method
                    .map((m) => m.toLowerCase())
                    .includes(method.toLowerCase()) &&
                    permission.type === resource_enum_1.ResourceTypeEnum.ALLOWED) {
                    return true;
                }
            }
        }
        return false;
    }
};
exports.CheckPermissionsHelper = CheckPermissionsHelper;
exports.CheckPermissionsHelper = CheckPermissionsHelper = __decorate([
    (0, common_1.Injectable)()
], CheckPermissionsHelper);
