import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { menuRegistry } from '@menu/index'
import { AdminMenuBuilder } from '@admin/config/adminMenuBuilder'
import './style.css'
import App from './App.vue'

// Register default menus
menuRegistry.register('admin', new AdminMenuBuilder())


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Dashboard Content</div>' } }
  ]
})

createApp(App).use(router).mount('#app')
