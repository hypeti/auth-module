import { Injectable } from "@nestjs/common";
import { ResourceTypeEnum } from "../enums/resource.enum";
import { JWTPermissions } from "../types/jwt-payload.type";

@Injectable()
export class CheckPermissionsHelper {
    validate(
        resource: string,
        method: string,
        permissions: JWTPermissions[],
    ) {
        const pathToRegex = (path: string) => {
            const regexString = path
                .replace(/:[^\s/]+/g, '([^/]+)')
                .replace('*', '.*');
            return new RegExp(`^${regexString}$`);
        };

        for (const permission of permissions) {
            const regex = pathToRegex(permission.path);

            if (regex.test(resource)) {
                if (
                    permission.method
                        .map((m) => m.toLowerCase())
                        .includes(method.toLowerCase()) &&
                    permission.type === ResourceTypeEnum.DENIED
                ) {
                    return false;
                }
            }
        }

        for (const permission of permissions) {
            const regex = pathToRegex(permission.path);
            if (regex.test(resource)) {
                if (
                    permission.method
                        .map((m) => m.toLowerCase())
                        .includes(method.toLowerCase()) &&
                    permission.type === ResourceTypeEnum.ALLOWED
                ) {
                    return true;
                }
            }
        }

        return false;
    }
}