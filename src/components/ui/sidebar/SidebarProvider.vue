<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useEventListener, useMediaQuery, useVModel } from '@vueuse/core'
import { TooltipProvider } from '@/components/ui/tooltip'
import { type HTMLAttributes, computed, provide, ref, type Ref } from 'vue'
import { type SidebarContext } from './utils'

const SIDEBAR_COOKIE_NAME = 'sidebar:state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '300px'
const SIDEBAR_WIDTH_MOBILE = '300px'
const SIDEBAR_WIDTH_ICON = '4rem'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

const props = withDefaults(defineProps<{
  defaultOpen?: boolean
  open?: boolean
  class?: HTMLAttributes['class']
  variant?: 'sidebar' | 'floating' | 'inset'
}>(), {
  defaultOpen: true,
  open: undefined,
  variant: 'sidebar',
})

const emits = defineEmits<{
  'update:open': [value: boolean]
}>()

const isMobile = useMediaQuery('(max-width: 768px)')
const openMobile = ref(false)

const _open = ref(props.defaultOpen)
const open = useVModel(props, 'open', emits, {
  defaultValue: _open.value,
  passive: (props.open === undefined) as true,
}) as Ref<boolean>

function setOpen(value: boolean) {
  open.value = value // cookie would go here
}

function toggleSidebar() {
  return isMobile.value
    ? openMobile.value = !openMobile.value
    : setOpen(!open.value)
}

useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    toggleSidebar()
  }
})

const state = computed(() => open.value ? 'expanded' : 'collapsed')

provide<SidebarContext>('sidebar-context', {
  state,
  open,
  setOpen,
  openMobile,
  setOpenMobile: (value: boolean) => openMobile.value = value,
  isMobile,
  toggleSidebar,
  variant: props.variant,
})
</script>

<template>
  <div
    :style="{
      '--sidebar-width': SIDEBAR_WIDTH,
      '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
    }"
    :class="cn('group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar', props.class)"
    :data-state="state"
    :data-variant="variant"
  >
    <TooltipProvider :delay-duration="0">
      <slot />
    </TooltipProvider>
  </div>
</template>
