import {reactive} from "vue";
import type {RegisterUseCase} from "@/modules/auth/application/use-cases/RegisterUseCase.ts";

export class RegisterViewModel {

    state = reactive({
        email: "",
        password: "",
        isLoading: false,
        error: null as string | null,
        success: false,
    });

    constructor(
        private readonly registerUseCase: RegisterUseCase
    ) {
    }

    async submitRegister() {
        if (this.state.isLoading) {
            return;
        }

        this.state.isLoading = true;
        this.state.error = null;

        try {
            await this.registerUseCase.execute({
                email: this.state.email,
                password: this.state.password,
            });

            this.state.success = true;
        } catch {
            this.state.error =
                "Une erreur est survenue lors de la création du compte.";
        } finally {
            this.state.isLoading = false;
        }
    }
}