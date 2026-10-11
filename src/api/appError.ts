import axios from 'axios'

export type FieldError = { field: string; code: string; params?: Record<string, unknown> }

export class AppError extends Error {
    constructor(
        public readonly code: string,
        public readonly params?: Record<string, unknown>,
        public readonly fieldErrors?: FieldError[],
    ) {
        super(code)
    }
}

type ApiErrorBody = {
    code?: string
    params?: Record<string, unknown>
    fieldErrors?: FieldError[]
}

export const toAppError = (e: unknown): AppError => {
    if (e instanceof AppError) return e
    if (axios.isCancel(e)) throw e                       // requête annulée : pas une erreur à afficher
    if (!axios.isAxiosError(e)) return new AppError('unknown')
    if (!e.response) return new AppError('network')      // réseau coupé, timeout

    const body = e.response.data as ApiErrorBody | undefined
    if (body?.code) return new AppError(body.code, body.params, body.fieldErrors)

    return new AppError(e.response.status >= 500 ? 'server' : 'unknown')
}