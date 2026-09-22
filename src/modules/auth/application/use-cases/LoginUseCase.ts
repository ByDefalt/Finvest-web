import type {AuthSession, Credential} from "@/modules/auth/domain/models";
import type {AuthRepository} from "@/modules/auth/domain/repositories/AuthRepository";

export class LoginUseCase {

    constructor(
        private readonly authRepository: AuthRepository
    ) {
    }

    async execute(credential: Credential): Promise<AuthSession> {
        return await this.authRepository.login(credential);
    }
}
