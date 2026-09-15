// src/auth/usecases/loginUseCase.js
import { login } from '@/auth/repositories/authRepository'

export class LoginUseCase {
    /**
     * @param {{ email: string, password: string }} payload
     */
    async execute(payload) {
        if (!payload.email) {
            throw new Error('L’adresse email est obligatoire')
        }

        if (!payload.password) {
            throw new Error('Le mot de passe est obligatoire')
        }

        if (payload.password.length < 6) {
            throw new Error(
                'Le mot de passe doit contenir au moins 6 caractères'
            )
        }
        await login(payload)
    }
}