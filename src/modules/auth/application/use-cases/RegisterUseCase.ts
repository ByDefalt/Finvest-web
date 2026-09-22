import type {Credential, User} from "@/modules/auth/domain/models";
import type {AuthRepository} from "@/modules/auth/domain/repositories/AuthRepository";

export class RegisterUseCase {

    constructor(
        private readonly authRepository: AuthRepository
    ) {
    }

    async execute(credential: Credential): Promise<User> {
        return await this.authRepository.register(credential);
    }
}