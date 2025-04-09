import { JWTPermissions } from "../types/jwt-payload.type";
export declare class CheckPermissionsHelper {
    validate(resource: string, method: string, permissions: JWTPermissions[]): boolean;
}
