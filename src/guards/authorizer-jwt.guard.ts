import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PERMISSIONS_KEY } from '../decorators/permissions/permissions.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IJWTPayload } from '../types/jwt-payload.type';
import { CheckPermissionsHelper } from '../helpers/check-permissions.helper';
import { IApiKeyRepository } from '../interfaces/api-key.repository';
import { RequestCustom } from '../types/hype-request';


@Injectable()
export class AuthorizerJWT implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    @Inject("ApiKeyRepository") private readonly apiKeysRepository: IApiKeyRepository,
    private readonly checkPermissionHelper: CheckPermissionsHelper,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const { resource, method } =
      this.reflector.getAllAndOverride(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || {};

    if (!resource || !method) {
      return false;
    }

    const request: RequestCustom = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authHeader.replace('Bearer ', '');

    let payload: IJWTPayload;
    const stage = this.configService.get<string>('STAGE');
    const jwtDecode = this.jwtService.decode(token);

    const apikey = await this.apiKeysRepository.findById(jwtDecode.keyId);
    const { jwtSecretKey } = apikey;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: `${jwtSecretKey}-${stage}`,
      });

      request.identifier = payload.identifier;
      request.clientId = payload.application.id;

    } catch (error: any) {
      this.logger.error(error);
      if (error.message === 'jwt expired') {
        throw new ForbiddenException('the incoming token has expired');
      }

      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }


    const validateRoutes = this.configService.get<boolean>("AUTH_VALIDATE_ROUTES");

    if (validateRoutes === true) {
      const hasPermission = this.checkPermissionHelper.validate(
        resource,
        method,
        payload.permissions,
      );

      if (!hasPermission) {
        throw new ForbiddenException(
          `You do not have permission to access this resource '${String(method).toLocaleUpperCase()} /${resource}'`,
        );
      }
    }
    return true;
  }


}
