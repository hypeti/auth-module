import { DynamicModule } from "@nestjs/common";
import { Provider } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { AuthorizerJWT } from "./guards/authorizer-jwt.guard";
import { IApiKeyRepository } from "./interfaces/api-key.repository";

@Module({})
export class HypeAuthModule {
    static register(ApiKeyRepositoryProvider: Provider<IApiKeyRepository>): DynamicModule {
        return {
            module: HypeAuthModule,
            providers: [
                ApiKeyRepositoryProvider,
                AuthorizerJWT
            ],
            exports: [AuthorizerJWT]
        }
    }
}