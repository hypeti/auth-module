export interface IApiKeyRepository {
    findById(id: string): Promise<{
        jwtSecretKey: string;
    }>;
}
