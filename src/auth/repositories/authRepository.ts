// src/repositories/authRepository.js
import { getAuth } from '@/generated/api/auth/auth'
import type {LoginResponse, UserResponse} from "@/generated/models"

const authApi = getAuth()

/**
 * @param {{ email: string, password: string }} payload
 * @returns {Promise<import('@/generated/models').UserResponse>}
 */
export async function register(payload: { email: any; password: any }) {
    const dto = await authApi.postAuthRegister({
        email: payload.email,
        password: payload.password,
    })
    return mapToAuthUser(dto)
}

/**
 * @param {import('@/generated/models').UserResponse} dto
 */
function mapToAuthUser(dto: UserResponse) {
    return { email: dto.email }
}

export async function login(payload: { email: string; password: string }) {
    const authToken = await authApi.postAuthLogin({
        email: payload.email,
        password: payload.password,
    })

    if (!authToken.token) {
        throw new Error('Token manquant')
    }

    localStorage.setItem('accessToken', authToken.token)
}