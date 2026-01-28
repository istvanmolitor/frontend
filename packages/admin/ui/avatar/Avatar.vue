<script setup lang="ts">
import { AvatarRoot } from 'radix-vue'
import { type AvatarVariants, avatarVariant } from '.'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  size?: AvatarVariants['size']
  shape?: AvatarVariants['shape']
}

withDefaults(defineProps<Props>(), {
  size: 'sm',
  shape: 'circle',
})
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), $props.class)">
    <slot />
  </AvatarRoot>
</template>
