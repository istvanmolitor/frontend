<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Home,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-vue-next'
import config from '@/config'
import MenuItem from './MenuItem.vue'

interface MenuItem {
  id?: number
  title: string
  path?: string
  icon?: string
  children?: MenuItem[]
  items?: MenuItem[] // Support both 'children' and 'items' for flexibility
}

const isCollapsed = ref(false)
const menuItems = ref<MenuItem[]>([])
const expandedItems = ref<Set<number>>(new Set())
const loading = ref(true)
const error = ref<string | null>(null)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleSubmenu = (itemId: number) => {
  if (expandedItems.value.has(itemId)) {
    expandedItems.value.delete(itemId)
  } else {
    expandedItems.value.add(itemId)
  }
}

const fetchMenuItems = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch(`${config.SERVER_URL}/api/menu/admin`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    menuItems.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load menu'
    console.error('Error fetching menu items:', err)
    // Fallback menu ha hiba történik
    menuItems.value = [
      { id: 1, icon: 'Home', title: 'Kezdőlap', path: '/' },
      { id: 2, icon: 'LayoutDashboard', title: 'Dashboard', path: '/dashboard' },
    ]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMenuItems()
})
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
    <nav class="flex-1 p-4 overflow-y-auto">
      <div v-if="loading" class="text-center py-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
      <div v-else-if="error" class="text-center py-4 text-red-500 text-sm">
        {{ error }}
      </div>
      <ul v-else class="space-y-1">
        <MenuItem
          v-for="item in menuItems"
          :key="item.id || item.title"
          :item="item"
          :level="0"
          :is-collapsed="isCollapsed"
          :expanded-items="expandedItems"
          @toggle="toggleSubmenu"
        />
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
