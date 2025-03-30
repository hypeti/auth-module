import { SetMetadata } from '@nestjs/common';
import { ResourceMethodTypeEnum } from '../../enums/resource-method.enum';
export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (resource: string, method: ResourceMethodTypeEnum) =>
  SetMetadata(PERMISSIONS_KEY, { resource, method });
