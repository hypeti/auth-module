import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CheckPermissionsHelper } from '../helpers/check-permissions.helper';
import { IApiKeyRepository } from '../interfaces/api-key.repository';
export declare class AuthorizerJWT implements CanActivate {
    private readonly reflector;
    private jwtService;
    private readonly configService;
    private readonly logger;
    private readonly apiKeysRepository;
    private readonly checkPermissionHelper;
    constructor(reflector: Reflector, jwtService: JwtService, configService: ConfigService, logger: Logger, apiKeysRepository: IApiKeyRepository, checkPermissionHelper: CheckPermissionsHelper);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
