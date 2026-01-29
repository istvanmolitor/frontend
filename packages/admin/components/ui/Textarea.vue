<script setup lang="ts">
import { cn } from '../../lib/utils'

interface TextareaProps {
  placeholder?: string
  modelValue?: string
  class?: string
  rows?: number
}

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 4
})

defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :rows="props.rows"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    :class="cn(
      'flex min-h-[80px] w-full rounded-md border border-[--color-input] bg-[--color-background] px-3 py-2 text-sm ring-offset-background placeholder:text-[--color-muted-foreground] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
  />
</template>
