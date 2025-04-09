import { ResourceMethodTypeEnum } from '../../enums/resource-method.enum';
export declare const PERMISSIONS_KEY = "permissions";
export declare const Permissions: (resource: string, method: ResourceMethodTypeEnum) => import("@nestjs/common").CustomDecorator<string>;
