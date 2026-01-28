<script setup lang="ts">
import { cn } from '../../lib/utils'

interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  class?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default'
})

const variantClasses = {
  default: 'bg-[--color-primary] text-[--color-primary-foreground] hover:bg-[--color-primary]/90',
  destructive: 'bg-[--color-destructive] text-[--color-destructive-foreground] hover:bg-[--color-destructive]/90',
  outline: 'border border-[--color-input] bg-[--color-background] hover:bg-[--color-accent] hover:text-[--color-accent-foreground]',
  secondary: 'bg-[--color-secondary] text-[--color-secondary-foreground] hover:bg-[--color-secondary]/80',
  ghost: 'hover:bg-[--color-accent] hover:text-[--color-accent-foreground]',
  link: 'text-[--color-primary] underline-offset-4 hover:underline'
}

const sizeClasses = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10'
}
</script>

<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variantClasses[props.variant],
      sizeClasses[props.size],
      props.class
    )"
  >
    <slot />
  </button>
</template>
