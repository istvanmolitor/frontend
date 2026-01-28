<script setup lang="ts">
import { cn } from '../../lib/utils'

interface CardProps {
  class?: string
}

const props = defineProps<CardProps>()
</script>

<template>
  <div :class="cn('rounded-2xl border border-[--color-border]/50 bg-[--color-card]/80 backdrop-blur-sm text-[--color-card-foreground] shadow-lg hover:shadow-xl transition-shadow duration-300', props.class)">
    <slot />
  </div>
</template>
