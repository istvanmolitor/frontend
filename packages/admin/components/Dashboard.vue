<script setup lang="ts">
import DashboardLayout from './layout/DashboardLayout.vue'
import Card from './ui/Card.vue'
import CardHeader from './ui/CardHeader.vue'
import CardTitle from './ui/CardTitle.vue'
import CardDescription from './ui/CardDescription.vue'
import CardContent from './ui/CardContent.vue'
import { TrendingUp, Users, ShoppingCart, DollarSign, BarChart3, LayoutDashboard } from 'lucide-vue-next'

const stats = [
  {
    title: 'Összes bevétel',
    value: '2,450,000 Ft',
    change: '+20.1%',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Felhasználók',
    value: '1,234',
    change: '+15.3%',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Rendelések',
    value: '892',
    change: '+8.2%',
    icon: ShoppingCart,
    color: 'text-purple-600'
  },
  {
    title: 'Növekedés',
    value: '+12.5%',
    change: '+4.1%',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
]

const recentActivities = [
  { user: 'Nagy Péter', action: 'Új rendelés', time: '5 perce' },
  { user: 'Kovács Anna', action: 'Profil frissítés', time: '12 perce' },
  { user: 'Szabó János', action: 'Termék vásárlás', time: '23 perce' },
  { user: 'Tóth Éva', action: 'Komment hozzáadva', time: '1 órája' },
]
</script>

<template>
  <DashboardLayout>
    <div class="space-y-8">
      <!-- Page Header -->
      <div class="relative">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">Dashboard</h1>
        <p class="text-[--color-muted-foreground] mt-2 text-lg">Üdvözöljük a vezérlőpulton! 👋</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card v-for="stat in stats" :key="stat.title" class="hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group overflow-hidden relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardContent class="p-6 relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p class="text-sm font-semibold text-[--color-muted-foreground] uppercase tracking-wide">{{ stat.title }}</p>
                <h3 class="text-3xl font-bold text-[--color-foreground] mt-3 group-hover:scale-105 transition-transform">{{ stat.value }}</h3>
                <div class="flex items-center gap-1 mt-2">
                  <TrendingUp :size="14" class="text-green-600" />
                  <p class="text-sm font-semibold text-green-600">{{ stat.change }}</p>
                  <span class="text-xs text-[--color-muted-foreground]">vs előző hónap</span>
                </div>
              </div>
              <div :class="['p-4 rounded-2xl bg-gradient-to-br shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300', stat.color === 'text-green-600' ? 'from-green-500 to-emerald-600' : stat.color === 'text-blue-600' ? 'from-blue-500 to-cyan-600' : stat.color === 'text-purple-600' ? 'from-purple-500 to-pink-600' : 'from-orange-500 to-red-600']">
                <component :is="stat.icon" :size="28" class="text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Chart Card -->
        <Card class="hover:shadow-xl transition-all duration-300 overflow-hidden">
          <CardHeader class="bg-gradient-to-r from-blue-500/5 to-purple-500/5">
            <CardTitle class="flex items-center gap-2">
              <BarChart3 :size="20" class="text-blue-600" />
              Értékesítési áttekintés
            </CardTitle>
            <CardDescription>Havi értékesítési adatok</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl relative overflow-hidden group">
              <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
              <div class="text-center relative z-10">
                <BarChart3 :size="48" class="mx-auto text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                <p class="text-[--color-muted-foreground] font-medium">Diagram helye</p>
                <p class="text-sm text-[--color-muted-foreground]">Integráljon chart library-t</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Recent Activity -->
        <Card class="hover:shadow-xl transition-all duration-300">
          <CardHeader class="bg-gradient-to-r from-purple-500/5 to-pink-500/5">
            <CardTitle class="flex items-center gap-2">
              <Users :size="20" class="text-purple-600" />
              Legutóbbi tevékenységek
            </CardTitle>
            <CardDescription>A legfrissebb felhasználói események</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div
                v-for="activity in recentActivities"
                :key="activity.time"
                class="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-200 hover:scale-[1.02] cursor-pointer group border border-transparent hover:border-purple-500/20"
              >
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold shadow-md group-hover:scale-110 transition-transform text-sm">
                  {{ activity.user.split(' ').map(n => n[0]).join('') }}
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-[--color-foreground] text-sm">{{ activity.user }}</p>
                  <p class="text-xs text-[--color-muted-foreground]">{{ activity.action }}</p>
                </div>
                <span class="text-xs text-[--color-muted-foreground] bg-[--color-muted] px-2 py-1 rounded-full">{{ activity.time }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Full Width Card -->
      <Card class="hover:shadow-xl transition-all duration-300">
        <CardHeader class="bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5">
          <CardTitle class="flex items-center gap-2">
            <LayoutDashboard :size="20" class="text-blue-600" />
            Projekt áttekintés
          </CardTitle>
          <CardDescription>Aktuális projektek és státuszok</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b-2 border-[--color-border]">
                  <th class="text-left py-4 px-4 text-sm font-bold text-[--color-foreground] uppercase tracking-wide">Projekt</th>
                  <th class="text-left py-4 px-4 text-sm font-bold text-[--color-foreground] uppercase tracking-wide">Státusz</th>
                  <th class="text-left py-4 px-4 text-sm font-bold text-[--color-foreground] uppercase tracking-wide">Előrehaladás</th>
                  <th class="text-left py-4 px-4 text-sm font-bold text-[--color-foreground] uppercase tracking-wide">Határidő</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-[--color-border] hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-200 group">
                  <td class="py-4 px-4 text-sm font-semibold">Weboldal újratervezés</td>
                  <td class="py-4 px-4"><span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md">Folyamatban</span></td>
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 bg-[--color-muted] rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style="width: 75%"></div>
                      </div>
                      <span class="text-sm font-semibold text-green-600">75%</span>
                    </div>
                  </td>
                  <td class="py-4 px-4 text-sm text-[--color-muted-foreground]">2026. feb. 15.</td>
                </tr>
                <tr class="border-b border-[--color-border] hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-200 group">
                  <td class="py-4 px-4 text-sm font-semibold">Mobil alkalmazás</td>
                  <td class="py-4 px-4"><span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-md">Tervezés</span></td>
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 bg-[--color-muted] rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full" style="width: 30%"></div>
                      </div>
                      <span class="text-sm font-semibold text-blue-600">30%</span>
                    </div>
                  </td>
                  <td class="py-4 px-4 text-sm text-[--color-muted-foreground]">2026. márc. 01.</td>
                </tr>
                <tr class="border-b border-[--color-border] hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5 transition-all duration-200 group">
                  <td class="py-4 px-4 text-sm font-semibold">API integráció</td>
                  <td class="py-4 px-4"><span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-md">Felülvizsgálat</span></td>
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-2">
                      <div class="flex-1 h-2 bg-[--color-muted] rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full" style="width: 90%"></div>
                      </div>
                      <span class="text-sm font-semibold text-orange-600">90%</span>
                    </div>
                  </td>
                  <td class="py-4 px-4 text-sm text-[--color-muted-foreground]">2026. jan. 30.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
</template>
