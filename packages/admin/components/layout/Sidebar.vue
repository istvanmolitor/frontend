<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'
import MenuItem from './MenuItem.vue'
import { getMenu } from '@menu/index'
import type { MenuItemConfig } from '@menu/index'

const route = useRoute()
const isCollapsed = ref(false)
const menuItems = ref<MenuItemConfig[]>([])
const expandedItems = ref<Set<string>>(new Set())

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const toggleSubmenu = (itemId: string) => {
  if (expandedItems.value.has(itemId)) {
    expandedItems.value.delete(itemId)
  } else {
    expandedItems.value.add(itemId)
  }
}

// Find and expand parent items for active route
const expandActiveParents = () => {
  const currentPath = route.path

  const findAndExpandParents = (items: MenuItemConfig[], parentIds: string[] = []): boolean => {
    for (const item of items) {
      const newParentIds = [...parentIds, item.id]

      // Check if this item's path matches current route
      if (item.path === currentPath) {
        // Expand all parent items
        parentIds.forEach(parentId => {
          expandedItems.value.add(parentId)
        })
        return true
      }

      // Check children recursively
      if (item.children && item.children.length > 0) {
        if (findAndExpandParents(item.children, newParentIds)) {
          return true
        }
      }
    }
    return false
  }

  findAndExpandParents(menuItems.value)
}

const loadMenuItems = () => {
  // Get the admin menu
  const adminMenu = getMenu('admin')
  if (adminMenu && adminMenu.children) {
    menuItems.value = adminMenu.children
    // Expand parents for initial route
    expandActiveParents()
  }
}

onMounted(() => {
  loadMenuItems()
})

// Watch route changes to keep menu expanded
watch(() => route.path, () => {
  expandActiveParents()
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
      <ul class="space-y-1">
        <MenuItem
          v-for="item in menuItems"
          :key="item.id"
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
