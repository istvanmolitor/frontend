<script setup lang="ts">
import { cn } from '../../lib/utils'

interface InputProps {
  type?: string
  placeholder?: string
  modelValue?: string | number
  class?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :type="props.type"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :class="cn(
      'flex h-10 w-full rounded-md border border-[--color-input] bg-[--color-background] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[--color-muted-foreground] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
  />
</template>
