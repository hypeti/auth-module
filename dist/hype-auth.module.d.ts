import { DynamicModule } from '@nestjs/common';
import { Provider } from '@nestjs/common';
import { IApiKeyRepository } from './interfaces/api-key.repository';
export declare class HypeAuthModule {
    static register(ApiKeyRepositoryProvider: Provider<IApiKeyRepository>): DynamicModule;
}
