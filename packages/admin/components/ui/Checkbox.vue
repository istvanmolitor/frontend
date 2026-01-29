<script setup lang="ts">
import { cn } from '../../lib/utils'

interface CheckboxProps {
  checked?: boolean
  class?: string
  id?: string
}

const props = defineProps<CheckboxProps>()
const emit = defineEmits(['update:checked'])

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:checked', target.checked)
}
</script>

<template>
  <input
    type="checkbox"
    :id="props.id"
    :checked="props.checked"
    @change="handleChange"
    :class="cn(
      'h-4 w-4 rounded border-[--color-input] text-[--color-primary] focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
  />
</template>
