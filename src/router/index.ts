import {createRouter, createWebHistory} from 'vue-router'

import RegisterView from '@/modules/auth/presentation/views/Register.vue'
import LoginView from '@/modules/auth/presentation/views/Login.vue'
import HomeView from '@/home/views/Home.vue'
import DashboardView from "@/modules/dashboard/presentation/views/DashboardView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: {name: 'login'},
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
    ],
})

export default router