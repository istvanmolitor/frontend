<script setup lang="ts">
import { ref } from 'vue'
import { Search, Plus, MoreHorizontal } from 'lucide-vue-next'
import AdminLayout from '@admin/layout/AdminLayout.vue'
import DataCard from '@admin/ui/DataCard.vue'
import StatusBadge from '@admin/ui/StatusBadge.vue'

const search = ref('')

const users = [
  { id: 1, name: 'Kovács Péter', email: 'kovacs.peter@email.hu', role: 'Admin', status: 'active' as const, joined: '2024-03-15', avatar: 'KP' },
  { id: 2, name: 'Nagy Anna', email: 'nagy.anna@email.hu', role: 'Szerkesztő', status: 'active' as const, joined: '2024-05-02', avatar: 'NA' },
  { id: 3, name: 'Tóth Gábor', email: 'toth.gabor@email.hu', role: 'Felhasználó', status: 'inactive' as const, joined: '2024-07-18', avatar: 'TG' },
  { id: 4, name: 'Kiss Éva', email: 'kiss.eva@email.hu', role: 'Felhasználó', status: 'active' as const, joined: '2024-08-22', avatar: 'KÉ' },
  { id: 5, name: 'Horváth Bence', email: 'horvath.bence@email.hu', role: 'Szerkesztő', status: 'pending' as const, joined: '2025-01-10', avatar: 'HB' },
  { id: 6, name: 'Szabó Márton', email: 'szabo.marton@email.hu', role: 'Felhasználó', status: 'active' as const, joined: '2025-03-30', avatar: 'SM' },
  { id: 7, name: 'Fekete Zsolt', email: 'fekete.zsolt@email.hu', role: 'Felhasználó', status: 'inactive' as const, joined: '2025-06-14', avatar: 'FZ' },
  { id: 8, name: 'Molnár Dóra', email: 'molnar.dora@email.hu', role: 'Admin', status: 'active' as const, joined: '2025-09-01', avatar: 'MD' },
]

const filtered = ref(users)

const filterUsers = () => {
  const q = search.value.toLowerCase()
  filtered.value = users.filter(u =>
    u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  )
}

const roleColors: Record<string, string> = {
  'Admin': 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  'Szerkeszto': 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  'Felhasznalo': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}

const getRoleColor = (role: string) => {
  if (role === 'Szerkesztő') return roleColors['Szerkeszto']
  if (role === 'Felhasználó') return roleColors['Felhasznalo']
  return roleColors[role] ?? roleColors['Felhasznalo']
}
</script>

<template>
  <AdminLayout page-title="Felhasználók">
  <div class="space-y-6">
    <!-- Toolbar -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative max-w-sm flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          v-model="search"
          @input="filterUsers"
          type="text"
          placeholder="Keresés név vagy email alapján..."
          class="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <button class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
        <Plus class="h-4 w-4" />
        Új felhasználó
      </button>
    </div>

    <!-- Table -->
    <DataCard :no-padding="true">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/30">
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Felhasználó</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Szerepkör</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Státusz</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Regisztrált</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Műveletek</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="user in filtered" :key="user.id" class="hover:bg-muted/40 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                    {{ user.avatar }}
                  </div>
                  <div>
                    <p class="font-medium text-foreground">{{ user.name }}</p>
                    <p class="text-xs text-muted-foreground">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', getRoleColor(user.role)]">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4"><StatusBadge :status="user.status" /></td>
              <td class="px-6 py-4 text-muted-foreground">{{ user.joined }}</td>
              <td class="px-6 py-4 text-right">
                <button class="rounded p-1 hover:bg-muted transition-colors">
                  <MoreHorizontal class="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-sm text-muted-foreground">
                Nincs találat a keresésre.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-t border-border px-6 py-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>{{ filtered.length }} felhasználó</span>
        <div class="flex items-center gap-2">
          <button class="rounded px-2 py-1 hover:bg-muted transition-colors">← Előző</button>
          <span class="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">1</span>
          <button class="rounded px-2 py-1 hover:bg-muted transition-colors">Következő →</button>
        </div>
      </div>
    </DataCard>
  </div>
  </AdminLayout>
</template>



