<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <main
    :class="cn(
      'relative flex min-h-svh flex-1 flex-col bg-background transition-all duration-200 ease-linear',
      'md:peer-data-[variant=sidebar]:peer-data-[state=collapsed]:ml-[--sidebar-width-icon] md:peer-data-[variant=sidebar]:peer-data-[state=expanded]:ml-[--sidebar-width]',
      'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-[calc(var(--sidebar-width-icon)+0.5rem)] md:peer-data-[variant=inset]:peer-data-[state=expanded]:ml-[calc(var(--sidebar-width)+0.5rem)] md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
      props.class,
    )"
  >
    <slot />
  </main>
</template>
