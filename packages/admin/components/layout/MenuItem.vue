<script setup lang="ts">
import { computed } from 'vue'
import {
  Home,
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-vue-next'

interface MenuItem {
  id?: number
  title: string
  path?: string
  icon?: string
  children?: MenuItem[]
  items?: MenuItem[]
}

interface Props {
  item: MenuItem
  level: number
  isCollapsed: boolean
  expandedItems: Set<number>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  toggle: [id: number]
}>()

const subItems = computed(() => {
  return props.item.items || props.item.children || []
})

const hasSubItems = computed(() => {
  return subItems.value.length > 0
})

const isExpanded = computed(() => {
  return props.item.id ? props.expandedItems.has(props.item.id) : false
})

const getIconComponent = (iconName?: string) => {
  const icons: Record<string, any> = {
    'Home': Home,
    'LayoutDashboard': LayoutDashboard,
    'BarChart3': BarChart3,
    'Users': Users,
    'Settings': Settings,
  }
  return iconName && icons[iconName] ? icons[iconName] : LayoutDashboard
}

const handleToggle = () => {
  if (props.item.id) {
    emit('toggle', props.item.id)
  }
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
        <component :is="getIconComponent(item.icon)" :size="iconSize" class="flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform" />
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
          :key="subItem.id || subItem.title"
          :item="subItem"
          :level="level + 1"
          :is-collapsed="isCollapsed"
          :expanded-items="expandedItems"
          @toggle="(id) => emit('toggle', id)"
        />
      </ul>
    </div>

    <!-- Regular menu item without subitems -->
    <a
      v-else
      :href="item.path"
      :class="[
        'flex items-center gap-3 rounded-xl text-[--color-muted-foreground] hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:text-[--color-foreground] transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group relative overflow-hidden',
        paddingClass,
        level === 0 ? '' : 'text-sm'
      ]"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
      <component :is="getIconComponent(item.icon)" :size="iconSize" class="flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform" />
      <span v-if="!isCollapsed" class="font-medium relative z-10">{{ item.title }}</span>
    </a>
  </li>
</template>
