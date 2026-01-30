<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  Circle
} from 'lucide-vue-next'
import type { MenuItemConfig } from '@menu/index'

interface Props {
  item: MenuItemConfig
  level: number
  isCollapsed: boolean
  expandedItems: Set<string>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  toggle: [id: string]
}>()

const subItems = computed(() => {
  return props.item.children || []
})

const hasSubItems = computed(() => {
  return subItems.value.length > 0
})

const isExpanded = computed(() => {
  return props.expandedItems.has(props.item.id)
})

const iconComponent = computed((): Component => {
  // If icon is already a Component, use it directly
  if (props.item.icon) {
    return props.item.icon as Component
  }

  // Default icon based on level
  return props.level === 0 ? LayoutDashboard : Circle
})

const handleToggle = () => {
  emit('toggle', props.item.id)
}

const iconSize = computed(() => {
  return props.level === 0 ? 20 : 16
})

const paddingClass = computed(() => {
  const basePadding = props.level === 0 ? 'px-3 py-3' : 'px-3 py-2'
  return basePadding
})

const marginClass = computed(() => {
  return props.level > 0 ? 'ml-6 pl-2 border-l-2 border-[--color-border]/30' : ''
})
</script>

<template>
  <li>
    <!-- Menu item with subitems -->
    <div v-if="hasSubItems">
      <button
        @click="handleToggle"
        :class="[
          'w-full flex items-center gap-3 rounded-xl text-[--color-muted-foreground] hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:text-[--color-foreground] transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group relative overflow-hidden',
          paddingClass,
          level === 0 ? '' : 'text-sm'
        ]"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <component :is="iconComponent" :size="iconSize" class="flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform" />
        <span v-if="!isCollapsed" class="font-medium relative z-10 flex-1 text-left">{{ item.title }}</span>
        <component
          v-if="!isCollapsed"
          :is="isExpanded ? ChevronUp : ChevronDown"
          :size="16"
          class="flex-shrink-0 relative z-10 transition-transform"
        />
      </button>

      <!-- Recursive submenu -->
      <ul
        v-if="isExpanded && !isCollapsed"
        :class="['mt-1 space-y-1', marginClass]"
      >
        <MenuItem
          v-for="subItem in subItems"
          :key="subItem.id"
          :item="subItem"
          :level="level + 1"
          :is-collapsed="isCollapsed"
          :expanded-items="expandedItems"
          @toggle="(id) => emit('toggle', id)"
        />
      </ul>
    </div>

    <!-- Regular menu item without subitems -->
    <RouterLink
      v-else
      :to="item.path || '#'"
      custom
      v-slot="{ href, navigate, isActive }"
    >
      <a
        :href="href"
        @click="navigate"
        :class="[
          'flex items-center gap-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group relative overflow-hidden',
          paddingClass,
          level === 0 ? '' : 'text-sm',
          isActive
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-[--color-foreground] font-semibold shadow-md'
            : 'text-[--color-muted-foreground] hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:text-[--color-foreground]'
        ]"
      >
        <div
          :class="[
            'absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-opacity',
            isActive ? 'opacity-15' : 'opacity-0 group-hover:opacity-10'
          ]"
        ></div>
        <component :is="iconComponent" :size="iconSize" class="flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform" />
        <span v-if="!isCollapsed" class="font-medium relative z-10">{{ item.title }}</span>
      </a>
    </RouterLink>
  </li>
</template>
