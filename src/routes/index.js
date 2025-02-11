import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/MenuView.vue')
        },
        {
            path: '/regions',
            name: 'regions',
            component: () => import('@/pages/RegionView.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/pages/DashportView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/Auth/Login.vue')
        },
        {
            path: '/Register',
            name: 'Register',
            component: () => import('@/pages/Auth/Register.vue')
        },
    ]
})

export default router
