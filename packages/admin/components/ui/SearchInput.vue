<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from './Input.vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  debounce?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [value: string]
}>()

const localValue = ref(props.modelValue)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  const delay = props.debounce ?? 300
  debounceTimer = setTimeout(() => {
    emit('search', newValue)
  }, delay)
})
</script>

<template>
  <div class="relative">
    <Input
      v-model="localValue"
      type="text"
      :placeholder="placeholder || 'Keresés...'"
      class="pl-8"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</template>
