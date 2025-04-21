import { ApiKeyStatusEnum } from '../enums/api-key-status.enum';
export interface IApiKeyRepository {
    findById(id: string): Promise<{
        jwtSecretKey: string;
        status: ApiKeyStatusEnum;
    }>;
}
