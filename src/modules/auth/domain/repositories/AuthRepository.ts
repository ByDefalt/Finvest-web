//register,refreshToken,logout,login

import type {AuthSession, Credential, User} from "@/modules/auth/domain/models";

export interface AuthRepository {
    register(credential: Credential): Promise<User>;

    login(credential: Credential): Promise<AuthSession>;

    logout(): Promise<void>;

    refreshToken(): Promise<AuthSession>;

}
