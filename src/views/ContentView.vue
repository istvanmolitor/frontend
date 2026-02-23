<script setup lang="ts">
import { ref } from 'vue'
import { Search, Plus, Edit2, Trash2 } from 'lucide-vue-next'
import AdminLayout from '@admin/layout/AdminLayout.vue'
import DataCard from '@admin/ui/DataCard.vue'
import StatusBadge from '@admin/ui/StatusBadge.vue'

const search = ref('')

const posts = [
  { id: 1, title: 'Hogyan optimalizáljuk a weboldalunkat?', category: 'SEO', author: 'Kovács Péter', status: 'active' as const, date: '2026-02-20', views: 1842 },
  { id: 2, title: 'Vue 3 – Composition API bevezető', category: 'Fejlesztés', author: 'Nagy Anna', status: 'active' as const, date: '2026-02-18', views: 3214 },
  { id: 3, title: 'Tailwind CSS tippek és trükkök', category: 'Design', author: 'Tóth Gábor', status: 'pending' as const, date: '2026-02-15', views: 0 },
  { id: 4, title: 'Adatbiztonság 2026-ban', category: 'Biztonság', author: 'Kiss Éva', status: 'active' as const, date: '2026-02-10', views: 921 },
  { id: 5, title: 'Mikroszolgáltatások alapjai', category: 'Fejlesztés', author: 'Horváth Bence', status: 'inactive' as const, date: '2026-01-28', views: 456 },
]

const filtered = ref(posts)

const filterPosts = () => {
  const q = search.value.toLowerCase()
  filtered.value = posts.filter(p =>
    p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  )
}
</script>

<template>
  <AdminLayout>
  <div class="space-y-6">
    <!-- Toolbar -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative max-w-sm flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          v-model="search"
          @input="filterPosts"
          type="text"
          placeholder="Keresés cím vagy kategória szerint..."
          class="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <button class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
        <Plus class="h-4 w-4" />
        Új bejegyzés
      </button>
    </div>

    <!-- Table -->
    <DataCard :no-padding="true">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border bg-muted/30">
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Cím</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Kategória</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Szerző</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Státusz</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Megtekintés</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Műveletek</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="post in filtered" :key="post.id" class="hover:bg-muted/40 transition-colors">
              <td class="px-6 py-4">
                <p class="font-medium text-foreground line-clamp-1">{{ post.title }}</p>
                <p class="text-xs text-muted-foreground">{{ post.date }}</p>
              </td>
              <td class="px-6 py-4">
                <span class="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{{ post.category }}</span>
              </td>
              <td class="px-6 py-4 text-muted-foreground">{{ post.author }}</td>
              <td class="px-6 py-4"><StatusBadge :status="post.status" /></td>
              <td class="px-6 py-4 text-right font-mono text-muted-foreground">{{ post.views.toLocaleString('hu') }}</td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button class="rounded p-1.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <Edit2 class="h-4 w-4" />
                  </button>
                  <button class="rounded p-1.5 hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-t border-border px-6 py-3 text-sm text-muted-foreground">
        {{ filtered.length }} bejegyzés
      </div>
    </DataCard>
  </div>
  </AdminLayout>
</template>

