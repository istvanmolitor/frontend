import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from '@user/router'
import languageRoutes from '@language/router'
import { authGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    ...userRoutes,
    ...languageRoutes
  ]
})

// Add global auth guard
router.beforeEach(authGuard)

export default router
