import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { menuRegistry } from '@menu/index'
import { AdminMenuBuilder } from '@admin/config/adminMenuBuilder'
import { UserMenuBuilder } from '@user/config/menuBuilder'
import userRoutes from '@user/router/index'
import './style.css'
import App from './App.vue'

// Register default menus
menuRegistry.register(new AdminMenuBuilder())
menuRegistry.register(new UserMenuBuilder())
// UserMenuBuilder has already been registered, and it's shared across menus now


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Dashboard Content</div>' } },
    ...userRoutes
  ]
})

createApp(App).use(router).mount('#app')
