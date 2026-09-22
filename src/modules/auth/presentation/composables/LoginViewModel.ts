import {reactive} from "vue";
import type {LoginUseCase} from "@/modules/auth/application/use-cases/LoginUseCase";
import type {Credential} from "@/modules/auth/domain/models";
import router from "@/router";

export class LoginViewModel {

    readonly state = reactive({
        email: "",
        password: "",
        isLoading: false,
        error: null as string | null,
        success: false,
    });

    constructor(
        private readonly loginUseCase: LoginUseCase
    ) {
    }

    async submitLogin() {
        if (this.state.isLoading) {
            return;
        }

        this.state.isLoading = true;
        this.state.error = null;
        this.state.success = false;

        const credential: Credential = {
            email: this.state.email,
            password: this.state.password,
        };

        try {
            await this.loginUseCase.execute(credential);

            this.state.success = true;
            await router.push({name: "home"});
        } catch {
            this.state.error = "Email ou mot de passe incorrect.";
        } finally {
            this.state.isLoading = false;
        }
    }
}