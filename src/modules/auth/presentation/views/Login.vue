<script setup lang="ts">
import {resolve} from "@/di/di.ts";
import type {LoginViewModel} from "@/modules/auth/presentation/composables/LoginViewModel.ts";

const viewModel = resolve<LoginViewModel>("loginViewModel")
</script>
<template>
  <form @submit.prevent="viewModel.submitLogin">
    <h2>Login</h2>

    <label for="email">Email</label>
    <input
        id="email"
        v-model="viewModel.state.email"
        type="email"
        required
    />

    <label for="password">Mot de passe</label>
    <input
        id="password"
        v-model="viewModel.state.password"
        type="password"
        required
    />

    <p v-if="viewModel.state.error" style="color: red">
      {{ viewModel.state.error }}
    </p>

    <button
        type="submit"
        :disabled="viewModel.state.isLoading"
    >
      {{ viewModel.state.isLoading ? 'Connexion...' : 'Se connecter' }}
    </button>
  </form>
</template>