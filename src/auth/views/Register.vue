<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRegisterViewModel } from '@/auth/composables/useRegisterViewModel'
import SuccessMessage from "@/common/SuccessMessage.vue";

const router = useRouter()

const {
  email,
  password,
  isLoading,
  error,
  success,
  submitRegister
} = useRegisterViewModel()

watch(success, async (isSuccess) => {
  if (isSuccess) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    await router.push({ name: 'login' })
  }
})
</script>

<template>

  <SuccessMessage
      v-if="success"
      title="Compte créé !"
      message="Votre compte a été créé avec succès."
  />

  <form v-else @submit.prevent="submitRegister">
    <h2>Register</h2>

    <label for="email">Email</label>
    <input
        id="email"
        v-model="email"
        type="email"
        required
    />

    <label for="password">Mot de passe</label>
    <input
        id="password"
        v-model="password"
        type="password"
        required
        minlength="6"
    />

    <p v-if="error" style="color: red">
      {{ error }}
    </p>

    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Création...' : 'Créer un compte' }}
    </button>
    <button type="button" @click="$router.push('/login')">Login</button>
  </form>
</template>