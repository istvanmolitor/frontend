import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { menuRegistry } from '@menu/index'
import { DashboardMenuBuilder, SettingsMenuBuilder, ProductsMenuBuilder } from '@admin/examples/menuBuilderExamples'
import { UserCircle, Settings, LogOut } from 'lucide-vue-next'
import './style.css'
import App from './App.vue'

// Register default menus
menuRegistry.register('admin', new DashboardMenuBuilder())
menuRegistry.register('admin', new ProductsMenuBuilder())
menuRegistry.register('admin', new SettingsMenuBuilder())

// Profile menu
menuRegistry.register('profile', {
  build: (menu) => {
    menu.children = [
      { id: 'profile-settings', title: 'Profil beállítások', path: '/profile', icon: UserCircle },
      { id: 'app-settings', title: 'Beállítások', path: '/settings', icon: Settings },
      { id: 'logout', title: 'Kijelentkezés', path: '/logout', icon: LogOut },
    ]
    return menu
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Dashboard Content</div>' } }
  ]
})

createApp(App).use(router).mount('#app')
