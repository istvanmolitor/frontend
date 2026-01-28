import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from '@user/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    ...userRoutes
  ]
})

export default router
