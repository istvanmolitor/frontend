<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@admin/layout/AdminLayout.vue'
import DataCard from '@admin/components/ui/DataCard.vue'
import StatusBadge from '@admin/components/ui/StatusBadge.vue'
import Icon from '@admin/components/ui/Icon.vue'

const search = ref('')
const statusFilter = ref('all')

const orders = [
  { id: '#4521', customer: 'Kovács Péter', product: 'Prémium csomag', amount: '18 900 Ft', status: 'completed' as const, date: '2026-02-22' },
  { id: '#4520', customer: 'Nagy Anna', product: 'Alap csomag', amount: '7 450 Ft', status: 'pending' as const, date: '2026-02-22' },
  { id: '#4519', customer: 'Tóth Gábor', product: 'Vállalati licenc', amount: '33 200 Ft', status: 'completed' as const, date: '2026-02-21' },
  { id: '#4518', customer: 'Kiss Éva', product: 'Add-on modul', amount: '12 100 Ft', status: 'cancelled' as const, date: '2026-02-21' },
  { id: '#4517', customer: 'Horváth Bence', product: 'Alap csomag', amount: '5 600 Ft', status: 'active' as const, date: '2026-02-20' },
  { id: '#4516', customer: 'Szabó Márton', product: 'Prémium csomag', amount: '18 900 Ft', status: 'completed' as const, date: '2026-02-20' },
  { id: '#4515', customer: 'Fekete Zsolt', product: 'Alap csomag', amount: '7 450 Ft', status: 'pending' as const, date: '2026-02-19' },
  { id: '#4514', customer: 'Molnár Dóra', product: 'Vállalati licenc', amount: '33 200 Ft', status: 'completed' as const, date: '2026-02-19' },
]

const filtered = ref(orders)

const applyFilter = () => {
  const q = search.value.toLowerCase()
  filtered.value = orders.filter(o => {
    const matchesSearch = o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
    const matchesStatus = statusFilter.value === 'all' || o.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
}
</script>

<template>
  <AdminLayout page-title="Rendelések">
  <div class="space-y-6">
    <!-- Toolbar -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div class="relative max-w-xs flex-1">
          <Icon name="Search" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            v-model="search"
            @input="applyFilter"
            type="text"
            placeholder="Keresés..."
            class="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div class="relative">
          <Icon name="Filter" class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            v-model="statusFilter"
            @change="applyFilter"
            class="h-9 appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          >
            <option value="all">Minden státusz</option>
            <option value="pending">Függőben</option>
            <option value="active">Aktív</option>
            <option value="completed">Teljesített</option>
            <option value="cancelled">Törölve</option>
          </select>
        </div>
      </div>
      <button class="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
        <Icon name="Download" class="h-4 w-4" />
        Export
      </button>
    </div>

    <!-- Table -->
    <DataCard :no-padding="true">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/30">
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rendelés</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Vevő</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Termék</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Összeg</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Státusz</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dátum</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="order in filtered" :key="order.id" class="hover:bg-muted/40 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-foreground">{{ order.id }}</td>
              <td class="px-6 py-4 text-foreground">{{ order.customer }}</td>
              <td class="px-6 py-4 text-muted-foreground">{{ order.product }}</td>
              <td class="px-6 py-4 font-medium text-foreground">{{ order.amount }}</td>
              <td class="px-6 py-4"><StatusBadge :status="order.status" /></td>
              <td class="px-6 py-4 text-muted-foreground">{{ order.date }}</td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-sm text-muted-foreground">
                Nincs találat.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-t border-border px-6 py-3 text-sm text-muted-foreground">
        {{ filtered.length }} rendelés
      </div>
    </DataCard>
  </div>
  </AdminLayout>
</template>

