// src/usecases/registerUseCase.js
import { register } from '@/auth/repositories/authRepository'

export class RegisterUseCase {
    /**
     * @param {{ email: any; password: any; }} payload
     */
    async execute(payload) {
        if (payload.password.length < 6) {
            throw new Error('Le mot de passe doit contenir au moins 6 caractères')
        }
        return register(payload)
    }
}