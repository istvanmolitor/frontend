<script setup lang="ts">
import { TrendingUp, Users, ShoppingCart, Eye } from 'lucide-vue-next'
import AdminLayout from '@admin/layout/AdminLayout.vue'
import DataCard from '@admin/ui/DataCard.vue'
import StatsCard from '@admin/ui/StatsCard.vue'

const stats = [
  { title: 'Oldalmegtekintések', value: '89 214', description: 'Elmúlt 30 nap', icon: Eye, trend: 12.3, color: 'blue' as const },
  { title: 'Egyedi látogatók', value: '24 571', description: 'Elmúlt 30 nap', icon: Users, trend: 8.1, color: 'green' as const },
  { title: 'Konverziók', value: '3.42%', description: 'Átlagos arány', icon: TrendingUp, trend: -1.2, color: 'orange' as const },
  { title: 'Bevétel/látogató', value: '2 150 Ft', description: 'Átlagos érték', icon: ShoppingCart, trend: 5.6, color: 'purple' as const },
]

const months = ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sze', 'Okt', 'Nov', 'Dec']
const visitData = [4200, 6800, 5900, 7400, 8200, 9100, 8600, 10200, 9400, 11000, 8700, 12400]
const maxVisit = Math.max(...visitData)

const channelData = [
  { label: 'Organikus', value: 42, color: 'bg-blue-500' },
  { label: 'Direkt', value: 28, color: 'bg-green-500' },
  { label: 'Közösségi', value: 18, color: 'bg-orange-500' },
  { label: 'Email', value: 8, color: 'bg-purple-500' },
  { label: 'Egyéb', value: 4, color: 'bg-gray-400' },
]

const topPages = [
  { page: '/', views: 18420, bounce: '42%' },
  { page: '/termekek', views: 9872, bounce: '35%' },
  { page: '/kapcsolat', views: 4310, bounce: '58%' },
  { page: '/blog', views: 3891, bounce: '47%' },
  { page: '/rolunk', views: 2140, bounce: '62%' },
]
</script>

<template>
  <AdminLayout page-title="Analitika">
  <div class="space-y-6">
    <!-- Stats -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard v-for="stat in stats" :key="stat.title" v-bind="stat" />
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Látogatottsági grafikon (CSS bar chart) -->
      <DataCard title="Havi látogatottság" description="2025-ös év" class="lg:col-span-2">
        <div class="flex items-end gap-1.5 h-48">
          <div
            v-for="(val, i) in visitData"
            :key="i"
            class="flex flex-1 flex-col items-center gap-1 group"
          >
            <span class="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {{ val.toLocaleString('hu') }}
            </span>
            <div
              class="w-full rounded-t bg-primary/80 hover:bg-primary transition-colors cursor-default"
              :style="{ height: (val / maxVisit * 100) + '%' }"
            />
            <span class="text-xs text-muted-foreground">{{ months[i] }}</span>
          </div>
        </div>
      </DataCard>

      <!-- Traffic channels -->
      <DataCard title="Forgalom forrásai">
        <div class="space-y-3">
          <div v-for="ch in channelData" :key="ch.label" class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-foreground">{{ ch.label }}</span>
              <span class="font-medium text-foreground">{{ ch.value }}%</span>
            </div>
            <div class="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                :class="['h-full rounded-full transition-all duration-700', ch.color]"
                :style="{ width: ch.value + '%' }"
              />
            </div>
          </div>
        </div>
      </DataCard>
    </div>

    <!-- Top pages -->
    <DataCard title="Leglátogatottabb oldalak" :no-padding="true">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-border bg-muted/30">
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Oldal</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Megtekintések</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Visszafordulás</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr v-for="p in topPages" :key="p.page" class="hover:bg-muted/40 transition-colors">
            <td class="px-6 py-3 font-mono text-foreground">{{ p.page }}</td>
            <td class="px-6 py-3 text-right font-medium">{{ p.views.toLocaleString('hu') }}</td>
            <td class="px-6 py-3 text-right text-muted-foreground">{{ p.bounce }}</td>
          </tr>
        </tbody>
      </table>
    </DataCard>
  </div>
  </AdminLayout>
</template>

