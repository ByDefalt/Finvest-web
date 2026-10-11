import {createRouter, createWebHistory} from 'vue-router'

import RegisterView from '@/modules/auth/presentation/views/Register.vue'
import LoginView from '@/modules/auth/presentation/views/Login.vue'
import DashboardView from "@/modules/dashboard/presentation/views/DashboardView.vue";
import {container} from "@/di/di.ts";
import type {AccessToken} from "@/auth/accessToken.ts";
import CreateAccount from "@/modules/account/presentation/views/CreateAccount.vue";

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
            meta: {requiresAuth: true},
            component: DashboardView,
        },
        {
            path: '/login',
            name: 'login',
            meta: {requiresAuth: false},
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            meta: {requiresAuth: false},
            component: RegisterView,
        },
        {
            path: '/test',
            name: 'test',
            meta: {requiresAuth: false},
            component: CreateAccount,
        }
    ],
})

export default router

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !container.resolve<AccessToken>('AccessToken').isLoggedIn()) {
        return {
            path: '/login',
            query: { redirect: to.fullPath },
        }
    }
})