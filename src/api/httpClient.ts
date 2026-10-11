// src/api/httpClient.ts
import type {AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios'
import axios from 'axios'
import {container} from "@/di/di.ts"
import type {AccessToken} from "@/auth/accessToken.ts"
import {AppError, toAppError} from "@/api/appError.ts";

type RetriableConfig = InternalAxiosRequestConfig & {_retry?: boolean}

const baseConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
}

const axiosInstance = axios.create(baseConfig)
// Client sans intercepteurs, uniquement pour le refresh
const refreshClient = axios.create(baseConfig)

const accessToken = () => container.resolve<AccessToken>("accessToken")

let refreshPromise: Promise<string> | null = null
const isAuthCall = (url?: string) => url?.startsWith('/auth/') ?? false
const refreshAccessToken = (): Promise<string> => {
    refreshPromise ??= refreshClient
        .post<{token: string}>('/auth/refresh')
        .then(({data}) => {
            accessToken().setToken(data.token)
            return data.token
        })
        .finally(() => {
            refreshPromise = null
        })
    return refreshPromise
}

axiosInstance.interceptors.request.use(config => {
    const token = accessToken().getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const original = error.config as RetriableConfig | undefined

        if (
            error.response?.status !== 401 ||
            !original ||
            original._retry ||
            isAuthCall(original.url) // ← nouveau
        ) {
            return Promise.reject(error)
        }
        original._retry = true

        let newToken: string
        try {
            newToken = await refreshAccessToken()
        } catch {
            accessToken().clearToken()
            window.location.href = '/login'
            return Promise.reject(new AppError('auth.sessionExpired'))
        }

        original.headers.Authorization = `Bearer ${newToken}`
        return axiosInstance(original)
    }
)
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> =>
    axiosInstance(config).then(response => response.data).catch(e => { throw toAppError(e) })