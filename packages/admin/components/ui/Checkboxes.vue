<script setup lang="ts" generic="T extends { id: number; name: string; description?: string | null }">
import Checkbox from './Checkbox.vue'
import Label from './Label.vue'

interface Props {
  items: T[]
  modelValue?: number[]
  label?: string
  emptyMessage?: string
  showDescription?: boolean
  idPrefix?: string
}

interface Emits {
  (e: 'update:modelValue', value: number[]): void
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  emptyMessage: 'Nincsenek elérhető elemek.',
  showDescription: true,
  idPrefix: 'item',
  modelValue: () => []
})

const emit = defineEmits<Emits>()

const isChecked = (itemId: number) => {
  return props.modelValue?.includes(itemId) ?? false
}

const toggleItem = (itemId: number, checked: boolean) => {
  const currentValue = props.modelValue ?? []
  const newValue = [...currentValue]

  if (checked) {
    if (!newValue.includes(itemId)) {
      newValue.push(itemId)
    }
  } else {
    const index = newValue.indexOf(itemId)
    if (index > -1) {
      newValue.splice(index, 1)
    }
  }

  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="space-y-3">
    <label v-if="label" class="text-sm font-medium">{{ label }}</label>
    <div class="space-y-2">
      <div v-for="item in items" :key="item.id" class="flex items-center space-x-2">
        <Checkbox
          :id="`${idPrefix}-${item.id}`"
          :checked="isChecked(item.id)"
          @update:checked="(checked) => toggleItem(item.id, checked)"
        />
        <Label :for="`${idPrefix}-${item.id}`" class="text-sm font-normal cursor-pointer">
          {{ item.name }}
          <span v-if="showDescription && item.description" class="text-[--color-muted-foreground] text-xs ml-1">
            - {{ item.description }}
          </span>
        </Label>
      </div>
      <p v-if="items.length === 0" class="text-sm text-[--color-muted-foreground]">
        {{ emptyMessage }}
      </p>
    </div>
  </div>
</template>
