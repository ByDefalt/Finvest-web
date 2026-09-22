import type {AuthRepository} from "@/modules/auth/domain/repositories/AuthRepository.ts";
import type {AuthSession, Credential, User} from "@/modules/auth/domain/models";
import {getAuth} from "@/modules/auth/infrastructure/generated/api";
import {
    mapCredentialToLoginRequest,
    mapCredentialToRegisterUserRequest,
    mapLoginResponseToAuthSession,
    mapUserResponseToUser
} from "@/modules/auth/infrastructure/mappers/AuthMapper.ts";

export class AuthApiRepository implements AuthRepository {

    private readonly api = getAuth();

    async login(credential: Credential): Promise<AuthSession> {
        const response = await this.api.login(mapCredentialToLoginRequest(credential));
        localStorage.setItem('accessToken', response.token);
        return mapLoginResponseToAuthSession(response);
    }

    async logout() {
        return await this.api.logout();
    }

    async refreshToken(): Promise<AuthSession> {
        const response = await this.api.refreshToken();
        return mapLoginResponseToAuthSession(response);
    }

    async register(credential: Credential): Promise<User> {
        const response = await this.api.register(mapCredentialToRegisterUserRequest(credential));
        return mapUserResponseToUser(response);
    }

}