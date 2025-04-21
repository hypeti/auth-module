import { DynamicModule } from '@nestjs/common';
import { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { IApiKeyRepository } from './interfaces/api-key.repository';
import { JwtAuthGuard } from './guards/authorizer-jwt.guard';

@Module({})
export class HypeAuthModule {
  static register(
    ApiKeyRepositoryProvider: Provider<IApiKeyRepository>,
  ): DynamicModule {
    return {
      module: HypeAuthModule,
      providers: [ApiKeyRepositoryProvider, JwtAuthGuard],
      exports: [JwtAuthGuard],
    };
  }
}
