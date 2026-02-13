import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { menuRegistry } from '@menu/index'
import { AdminMenuBuilder } from '@admin/config/adminMenuBuilder'
import { UserMenuBuilder } from '@user/config/menuBuilder'
import { LanguageMenuBuilder } from '@/packages/vue-language/config/menuBuilder'
import userRoutes from '@user/router/index'
import './style.css'
import App from './App.vue'
import {authGuard} from "@user/router/guards.ts";
import languageRoutes from "@/packages/vue-language/router";

// Register default menus
menuRegistry.register(new AdminMenuBuilder())
menuRegistry.register(new UserMenuBuilder())
menuRegistry.register(new LanguageMenuBuilder())
// UserMenuBuilder has already been registered, and it's shared across menus now


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    ...userRoutes,
    ...languageRoutes
  ]
})
router.beforeEach(authGuard)

createApp(App).use(router).mount('#app')
