import type { RouteRecordRaw } from 'vue-router'

const userRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/UserIndex.vue')
  },
  {
    path: '/users/create',
    name: 'user-create',
    component: () => import('../views/UserCreate.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  }
]

export default userRoutes
