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
      'group-data-[variant=sidebar]/sidebar-wrapper:md:ml-[--sidebar-width] group-data-[variant=sidebar]/sidebar-wrapper:group-data-[state=collapsed]/sidebar-wrapper:md:ml-[--sidebar-width-icon]',
      'group-data-[variant=inset]/sidebar-wrapper:min-h-[calc(100svh-theme(spacing.4))] group-data-[variant=inset]/sidebar-wrapper:md:m-2 group-data-[variant=inset]/sidebar-wrapper:md:ml-[--sidebar-width] group-data-[variant=inset]/sidebar-wrapper:group-data-[state=collapsed]/sidebar-wrapper:md:ml-[--sidebar-width-icon] group-data-[variant=inset]/sidebar-wrapper:md:rounded-xl group-data-[variant=inset]/sidebar-wrapper:md:shadow',
      props.class,
    )"
  >
    <slot />
  </main>
</template>
