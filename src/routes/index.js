import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Auth/Login.vue'),
      meta: { layout: 'auth' } 
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/MenuView.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/DashportView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/regions',
      name: 'regions',
      component: () => import('@/pages/RegionView.vue'),
      meta: { requiresAuth: true }
    }
  ]
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userToken');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
