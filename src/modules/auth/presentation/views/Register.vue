<script setup lang="ts">
import {resolve} from "@/di/di.ts";
import type {RegisterViewModel} from "@/modules/auth/presentation/composables/RegisterViewModel.ts";

const viewModel = resolve<RegisterViewModel>("registerViewModel")
</script>

<template>
  <form @submit.prevent="viewModel.submitRegister">
    <input v-model="viewModel.state.email" type="email" required/>

    <input
        v-model="viewModel.state.password"
        type="password"
        required
        minlength="6"
    />

    <p v-if="viewModel.state.error">
      {{ viewModel.state.error }}
    </p>

    <button type="submit" :disabled="viewModel.state.isLoading">
      {{ viewModel.state.isLoading ? 'Création...' : 'Créer un compte' }}
    </button>
  </form>
</template>