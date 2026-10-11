import { useI18n } from 'vue-i18n'
import type { AppError, FieldError } from '@/api/appError'

export const useErrorMessage = () => {
    const { t, te } = useI18n()

    return (e: Pick<AppError | FieldError, 'code' | 'params'>) => {
        const key = `errors.${e.code}`
        return te(key) ? t(key, e.params ?? {}) : t('errors.unknown')
    }
}