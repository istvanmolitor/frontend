<script setup lang="ts">
import { ref } from 'vue'
import { 
  Home, 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const menuItems = [
  { icon: Home, label: 'Kezdőlap', path: '/' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BarChart3, label: 'Statisztikák', path: '/stats' },
  { icon: Users, label: 'Felhasználók', path: '/users' },
  { icon: Settings, label: 'Beállítások', path: '/settings' },
]
</script>

<template>
  <aside 
    :class="[
      'bg-[--color-card]/80 backdrop-blur-xl border-r border-[--color-border]/50 transition-all duration-300 flex flex-col shadow-2xl',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Sidebar Header -->
    <div class="p-4 border-b border-[--color-border]/50 flex items-center justify-between relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      <h2 v-if="!isCollapsed" class="text-xl font-bold text-[--color-foreground] relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dashboard</h2>
      <button 
        @click="toggleSidebar"
        class="p-2 rounded-lg hover:bg-[--color-accent] transition-all duration-200 hover:scale-110 relative z-10 group"
      >
        <ChevronLeft v-if="!isCollapsed" :size="20" class="group-hover:animate-pulse" />
        <ChevronRight v-if="isCollapsed" :size="20" class="group-hover:animate-pulse" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4">
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.path">
          <a
            :href="item.path"
            class="flex items-center gap-3 px-3 py-3 rounded-xl text-[--color-muted-foreground] hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:text-[--color-foreground] transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group relative overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <component :is="item.icon" :size="20" class="flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform" />
            <span v-if="!isCollapsed" class="font-medium relative z-10">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- User Section -->
    <div class="p-4 border-t border-[--color-border]/50 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
      <div class="flex items-center gap-3 hover:bg-[--color-accent]/50 p-2 rounded-xl transition-all duration-200 cursor-pointer group">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg group-hover:scale-110 transition-transform ring-2 ring-blue-500/20">
          A
        </div>
        <div v-if="!isCollapsed" class="flex-1">
          <p class="text-sm font-semibold text-[--color-foreground]">Admin User</p>
          <p class="text-xs text-[--color-muted-foreground]">admin@example.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>
