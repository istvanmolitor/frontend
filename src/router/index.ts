import { createRouter, createWebHistory } from 'vue-router'
import { router as userRoutes } from '@user/index'
import languageRoutes from '@language/router/index'
import cmsRoutes from '@cms/router/index'
import { authGuard } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    ...userRoutes,
    ...languageRoutes,
    ...cmsRoutes
  ]
})

// Add global auth guard
router.beforeEach(authGuard)

export default router
