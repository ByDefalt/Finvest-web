<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginViewModel } from '@/auth/composables/useLoginViewModel.js'

const router = useRouter()

const {
  email,
  password,
  isLoading,
  error,
  success,
  submitLogin
} = useLoginViewModel()

watch(success, async (isSuccess) => {
  if (isSuccess) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    await router.push({ name: 'home' })
  }
})
</script>

<template>
  <form @submit.prevent="submitLogin">
    <h2>Login</h2>

    <label for="email">Email</label>
    <input id="email" v-model="email" type="email" required />

    <label for="password">Mot de passe</label>
    <input id="password" v-model="password" type="password" required />
    <p v-if="error" style="color: red">
      {{ error }}
    </p>
    <button type="submit" :disabled="isLoading" >
      {{ isLoading ? 'Connexion...' : 'Se connecter' }}
    </button>
    <button type="button" @click="$router.push('/register')">Register</button>
  </form>
</template>