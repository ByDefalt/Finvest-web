// src/composables/useRegisterViewModel.js
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginUseCase } from "../usecases/loginUseCase"

const loginUseCase = new LoginUseCase()

export function useLoginViewModel() {
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    /** @type {import('vue').Ref<string | null>} */
    const error = ref(null)
    const success = ref(false)

    async function submitLogin() {
        error.value = null
        isLoading.value = true
        try {
            await loginUseCase.execute({
                email: email.value,
                password: password.value,
            })
            success.value = true
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Une erreur est survenue'
        } finally {
            isLoading.value = false
        }
    }

    return { email, password, isLoading, error, success, submitLogin }
}