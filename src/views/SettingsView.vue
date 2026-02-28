<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@admin/layout/AdminLayout.vue'
import DataCard from '@admin/components/ui/DataCard.vue'

const profile = ref({
  name: 'John Doe',
  email: 'admin@example.com',
  role: 'Admin',
  language: 'hu',
})

const notifications = ref({
  email: true,
  browser: false,
  orders: true,
  security: true,
})

const saved = ref(false)
const saveSettings = () => {
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}
</script>

<template>
  <AdminLayout page-title="Beállítások">
  <div class="space-y-6 max-w-2xl">
    <!-- Profile -->
    <DataCard title="Profil adatok" description="Alap fiókadatok kezelése">
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
            JD
          </div>
          <button class="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted transition-colors">
            Kép módosítása
          </button>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Teljes név</label>
            <input
              v-model="profile.name"
              class="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">E-mail cím</label>
            <input
              v-model="profile.email"
              type="email"
              class="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Szerepkör</label>
            <input
              v-model="profile.role"
              disabled
              class="h-9 w-full rounded-lg border border-border bg-muted px-3 text-sm text-muted-foreground cursor-not-allowed"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Nyelv</label>
            <select
              v-model="profile.language"
              class="h-9 w-full appearance-none rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              <option value="hu">Magyar</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </DataCard>

    <!-- Notifications -->
    <DataCard title="Értesítések" description="Mikor kapjon értesítést?">
      <div class="space-y-4">
        <div v-for="(_val, key) in notifications" :key="key" class="flex items-center justify-between py-2 border-b border-border last:border-0">
          <div>
            <p class="text-sm font-medium text-foreground">
              {{ { email: 'Email értesítések', browser: 'Böngésző értesítések', orders: 'Rendelési frissítések', security: 'Biztonsági riasztások' }[key] }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ { email: 'Fontosabb eseményekről emailben', browser: 'Push értesítések böngészőben', orders: 'Rendelések állapotváltozásairól', security: 'Bejelentkezési és biztonsági eseményekről' }[key] }}
            </p>
          </div>
          <button
            @click="notifications[key] = !notifications[key]"
            :class="[
              'relative h-6 w-11 rounded-full transition-colors',
              notifications[key] ? 'bg-primary' : 'bg-muted-foreground/30'
            ]"
          >
            <span :class="['absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', notifications[key] ? 'left-5.5 translate-x-0.5' : 'left-0.5']" />
          </button>
        </div>
      </div>
    </DataCard>

    <!-- Security -->
    <DataCard title="Biztonság" description="Jelszó és hitelesítési beállítások">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-1.5">Jelenlegi jelszó</label>
          <input type="password" placeholder="••••••••" class="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Új jelszó</label>
            <input type="password" placeholder="••••••••" class="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Jelszó megerősítése</label>
            <input type="password" placeholder="••••••••" class="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
      </div>
    </DataCard>

    <!-- Save -->
    <div class="flex justify-end">
      <button
        @click="saveSettings"
        :class="[
          'rounded-lg px-6 py-2 text-sm font-medium transition-all',
          saved
            ? 'bg-green-500 text-white'
            : 'bg-primary text-primary-foreground hover:opacity-90'
        ]"
      >
        {{ saved ? '✓ Mentve!' : 'Változtatások mentése' }}
      </button>
    </div>
  </div>
  </AdminLayout>
</template>


