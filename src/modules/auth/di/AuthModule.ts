// src/modules/auth/di/AuthModule.ts

import {container} from "@/di/di.ts";
import {asClass} from "awilix";
import {RegisterViewModel} from "@/modules/auth/presentation/composables/RegisterViewModel.ts";
import {LoginViewModel} from "@/modules/auth/presentation/composables/LoginViewModel.ts";
import {AuthApiRepository} from "@/modules/auth/infrastructure/repositories/AuthApiRepository.ts";
import {RegisterUseCase} from "@/modules/auth/application/use-cases/RegisterUseCase.ts";
import {LoginUseCase} from "@/modules/auth/application/use-cases/LoginUseCase.ts";

export function AuthModule() {
    container.register({
        authRepository: asClass(AuthApiRepository).singleton(),


        registerUseCase: asClass(RegisterUseCase).singleton(),
        loginUseCase: asClass(LoginUseCase).singleton(),


        registerViewModel: asClass(RegisterViewModel).scoped(),
        loginViewModel: asClass(LoginViewModel).scoped(),
    });
}