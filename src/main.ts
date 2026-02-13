import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { menuRegistry } from '@menu/index'
import { AdminMenuBuilder } from '@admin/config/adminMenuBuilder'
import { UserMenuBuilder } from '@user/config/menuBuilder'
import { LanguageMenuBuilder } from '@language/config/menuBuilder'
import { MediaMenuBuilder } from '@media/config/menuBuilder'
import { CmsMenuBuilder } from '@cms/config/menuBuilder'
import userRoutes from '@user/router/index'
import languageRoutes from '@language/router'
import mediaRoutes from '@media/router'
import cmsRoutes from '@cms/router/index'
import './style.css'
import App from './App.vue'
import {authGuard} from "@user/router/guards.ts";

// Register default menus
menuRegistry.register(new AdminMenuBuilder())
menuRegistry.register(new UserMenuBuilder())
menuRegistry.register(new LanguageMenuBuilder())
menuRegistry.register(new MediaMenuBuilder())
menuRegistry.register(new CmsMenuBuilder())

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    ...userRoutes,
    ...languageRoutes,
    ...mediaRoutes,
    ...cmsRoutes
  ]
})
router.beforeEach(authGuard)

createApp(App).use(router).mount('#app')
