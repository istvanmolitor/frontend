<script setup lang="ts">
import { computed } from 'vue'
import {
  Plus,
  Save,
  X,
  Upload,
  Loader2,
  Key,
  Mail,
  RefreshCw,
  Lock,
  PenLine,
  LogOut,
  Users,
  type LucideIcon
} from 'lucide-vue-next'

interface IconProps {
  name: string
  size?: number
  class?: string | string[]
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 16,
  class: ''
})

const iconMap: Record<string, LucideIcon> = {
  plus: Plus,
  save: Save,
  x: X,
  upload: Upload,
  loader: Loader2,
  key: Key,
  mail: Mail,
  refresh: RefreshCw,
  lock: Lock,
  'pen-line': PenLine,
  logout: LogOut,
  users: Users,
}

const iconComponent = computed(() => {
  return iconMap[props.name] || Plus
})
</script>

<template>
  <component
    :is="iconComponent"
    :size="size"
    :class="props.class"
  />
</template>



