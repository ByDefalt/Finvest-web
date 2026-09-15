// stores/authStore.js
//import { defineStore } from 'pinia'
//import { getCurrentUser } from '@/auth/repositories/authRepository'
//
//export const useAuthStore = defineStore('auth', {
//    state: () => ({ user: null, isLoaded: false }),
//    actions: {
//        async fetchUser() {
//            if (this.isLoaded) return this.user
//            this.user = await getCurrentUser()
//            this.isLoaded = true
//            return this.user
//        },
//        clear() {
//            this.user = null
//            this.isLoaded = false
//        },
//    },
//    persist: true,
//})

