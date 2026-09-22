// src/api/httpClient.ts
import type {AxiosRequestConfig} from 'axios'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosInstance.interceptors.response.use(
    response => response,

    async error => {
        if (error.response?.status !== 401) {
            return Promise.reject(error)
        }

        // tenter un refresh
        try {
            const response = await axiosInstance.post('/auth/refresh')

            const newAccessToken = response.data.token

            localStorage.setItem('accessToken', newAccessToken)

            // Rejouer la requête originale
            error.config.headers.Authorization = `Bearer ${newAccessToken}`

            return axiosInstance(error.config)

        } catch {
            // Refresh token invalide/expiré
            localStorage.removeItem('accessToken')

            window.location.href = '/login'

            return Promise.reject(error)
        }
    }
)

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
    return axiosInstance(config).then(response => response.data)
}