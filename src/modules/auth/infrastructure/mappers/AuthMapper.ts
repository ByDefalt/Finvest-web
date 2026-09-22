import type {
    LoginRequest,
    LoginResponse,
    RegisterUserRequest,
    UserResponse
} from "@/modules/auth/infrastructure/generated/models";


import type {AuthSession, Credential, User} from "@/modules/auth/domain/models";

export function mapUserResponseToUser(userResponse: UserResponse): User {
    return {
        email: userResponse.email
    };
}

export function mapLoginResponseToAuthSession(loginResponse: LoginResponse): AuthSession {
    return {
        accessToken: loginResponse.token
    };
}

export function mapCredentialToLoginRequest(credential: Credential): LoginRequest {
    return {
        email: credential.email,
        password: credential.password,
    };
}

export function mapCredentialToRegisterUserRequest(credential: Credential): RegisterUserRequest {
    return {
        email: credential.email,
        password: credential.password,
    };
}