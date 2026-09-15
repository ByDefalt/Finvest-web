import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '@/auth/views/Register.vue'
import LoginView from '@/auth/views/Login.vue'
import HomeView from '@/home/views/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: 'login' },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
    ],
})

export default router