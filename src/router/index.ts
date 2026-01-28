import { createRouter, createWebHistory } from 'vue-router'
import UserIndex from '@user/views/UserIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/users/create',
      name: 'user-create',
      component: () => import('@user/views/UserCreate.vue')
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: () => import('@user/views/UserEdit.vue')
    }
  ]
})

export default router
