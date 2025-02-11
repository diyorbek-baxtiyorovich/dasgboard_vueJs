import { createRouter, createWebHistory } from 'vue-router'
import RegionsView from '../pages/RegionView.vue'
import DashportView from '../pages/DashportView.vue'

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
            component: RegionsView,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashportView,
        },
    ]
})

export default router
