<script setup lang="ts">
import AdminLayout from '@admin/components/layout/AdminLayout.vue'
import StatsCard from '@admin/components/ui/StatsCard.vue'
import DataCard from '@admin/components/ui/DataCard.vue'
import StatusBadge from '@admin/components/ui/StatusBadge.vue'
import Icon from '@admin/components/ui/Icon.vue'
import { RouterLink } from 'vue-router'

const stats = [
  { title: 'Összes bevétel', value: '4 231 890 Ft', description: 'Január–Február összesítve', icon: 'DollarSign', trend: 12.5, color: 'green' as const },
  { title: 'Felhasználók', value: '2 847', description: '128 új a héten', icon: 'Users', trend: 8.2, color: 'blue' as const },
  { title: 'Rendelések', value: '1 429', description: 'ebből 34 függőben', icon: 'ShoppingCart', trend: -3.1, color: 'orange' as const },
  { title: 'Oldal látogatás', value: '89 214', description: 'Átl. 2 614/nap', icon: 'TrendingUp', trend: 5.7, color: 'purple' as const },
]

const recentOrders = [
  { id: '#4521', customer: 'Kovács Péter', amount: '18 900 Ft', status: 'completed' as const, date: '2026-02-22' },
  { id: '#4520', customer: 'Nagy Anna', amount: '7 450 Ft', status: 'pending' as const, date: '2026-02-22' },
  { id: '#4519', customer: 'Tóth Gábor', amount: '33 200 Ft', status: 'completed' as const, date: '2026-02-21' },
  { id: '#4518', customer: 'Kiss Éva', amount: '12 100 Ft', status: 'cancelled' as const, date: '2026-02-21' },
  { id: '#4517', customer: 'Horváth Bence', amount: '5 600 Ft', status: 'active' as const, date: '2026-02-20' },
]

const topProducts = [
  { name: 'Prémium csomag', sales: 842, revenue: '7 850 000 Ft', pct: 92 },
  { name: 'Alap csomag', sales: 614, revenue: '3 070 000 Ft', pct: 67 },
  { name: 'Vállalati licenc', sales: 231, revenue: '9 240 000 Ft', pct: 45 },
  { name: 'Add-on modul', sales: 198, revenue: '990 000 Ft', pct: 32 },
]
</script>

<template>
  <AdminLayout page-title="Dashboard">
    <div class="space-y-6">
    <!-- Stats grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        v-for="stat in stats"
        :key="stat.title"
        v-bind="stat"
      />
    </div>

    <!-- Middle row -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Recent orders (span 2) -->
      <DataCard title="Legutóbbi rendelések" description="Az utolsó 5 rendelés" class="lg:col-span-2" :no-padding="true">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Azonosító</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Vevő</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Összeg</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Státusz</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dátum</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-muted/50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-foreground">{{ order.id }}</td>
              <td class="px-6 py-4 text-foreground">{{ order.customer }}</td>
              <td class="px-6 py-4 font-medium">{{ order.amount }}</td>
              <td class="px-6 py-4"><StatusBadge :status="order.status" /></td>
              <td class="px-6 py-4 text-muted-foreground">{{ order.date }}</td>
            </tr>
          </tbody>
        </table>
        <div class="border-t border-border px-6 py-3">
          <RouterLink to="/orders" class="text-sm font-medium text-primary hover:underline">
            Összes rendelés megtekintése →
          </RouterLink>
        </div>
      </DataCard>

      <!-- Top products -->
      <DataCard title="Top termékek" description="Értékesítés alapján">
        <div class="space-y-4">
          <div v-for="product in topProducts" :key="product.name" class="space-y-1">
            <div class="flex items-center justify-between text-sm">
              <span class="font-medium text-foreground">{{ product.name }}</span>
              <span class="text-muted-foreground">{{ product.sales }} db</span>
            </div>
            <div class="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                class="h-full rounded-full bg-primary transition-all duration-500"
                :style="{ width: product.pct + '%' }"
              />
            </div>
            <p class="text-xs text-muted-foreground text-right">{{ product.revenue }}</p>
          </div>
        </div>
      </DataCard>
    </div>

    <!-- Quick actions -->
    <DataCard title="Gyors műveletek">
      <div class="flex flex-wrap gap-3">
        <RouterLink to="/users" class="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
          <Icon name="Users" class="h-4 w-4" />
          Új felhasználó
        </RouterLink>
        <RouterLink to="/orders" class="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
          <Icon name="ShoppingCart" class="h-4 w-4" />
          Rendelések kezelése
        </RouterLink>
        <RouterLink to="/analytics" class="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
          <Icon name="Eye" class="h-4 w-4" />
          Riport megtekintése
        </RouterLink>
      </div>
    </DataCard>
  </div>
  </AdminLayout>
</template>

