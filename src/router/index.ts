import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@admin/layout/AdminLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import UsersView from '../views/UsersView.vue'
import OrdersView from '../views/OrdersView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import ContentView from '../views/ContentView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      children: [
        { path: '', name: 'dashboard', component: DashboardView },
        { path: 'users', name: 'users', component: UsersView },
        { path: 'orders', name: 'orders', component: OrdersView },
        { path: 'analytics', name: 'analytics', component: AnalyticsView },
        { path: 'content', name: 'content', component: ContentView },
        { path: 'settings', name: 'settings', component: SettingsView },
      ],
    },
  ],
})

export default router

