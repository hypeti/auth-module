import { ResourceTypeEnum } from '../enums/resource.enum';
import { SessionTypeEnum } from '../enums/session-type.enum';

interface IJWTClient {
  id: string;
  name: string;
}

interface IJWTUser {
  id: string;
  name: string;
  accountId: string;
  createdAt: Date;
}

export interface JWTPermissions {
  path: string;
  method: string[];
  type: ResourceTypeEnum;
}

export interface IJWTPayload {
  application: IJWTClient;
  identifier: string;
  user?: IJWTUser;
  permissions: JWTPermissions[];
  keyId: string;
  jti: string;
  sub: string;
  environment: string;
  iis: string;
  type: SessionTypeEnum;
}
