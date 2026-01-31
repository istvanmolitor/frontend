<script setup lang="ts" generic="T extends { id: number; [key: string]: any }">
import Checkbox from './Checkbox.vue'
import Label from './Label.vue'

interface Props {
  items: T[]
  modelValue?: number[]
  label?: string
  emptyMessage?: string
  showDescription?: boolean
  idPrefix?: string
  labelField?: keyof T
  descriptionField?: keyof T
}

interface Emits {
  (e: 'update:modelValue', value: number[]): void
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  emptyMessage: 'Nincsenek elérhető elemek.',
  showDescription: true,
  idPrefix: 'item',
  modelValue: () => [],
  labelField: 'name' as any,
  descriptionField: 'description' as any
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
    <label v-if="label" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{{ label }}</label>
    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="item in items"
        :key="item.id"
        class="relative flex items-start space-x-3 rounded-lg border p-4 shadow-sm transition-colors hover:bg-[--color-accent] cursor-pointer"
        @click="toggleItem(item.id, !isChecked(item.id))"
      >
        <div class="flex h-5 items-center">
          <Checkbox
            :id="`${idPrefix}-${item.id}`"
            :checked="isChecked(item.id)"
            @update:checked="(checked) => toggleItem(item.id, checked)"
            @click.stop
          />
        </div>
        <div class="grid gap-1.5 leading-none">
          <Label
            :for="`${idPrefix}-${item.id}`"
            class="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {{ item[labelField] }}
          </Label>
          <p
            v-if="showDescription && item[descriptionField]"
            class="text-xs text-[--color-muted-foreground]"
          >
            {{ item[descriptionField] }}
          </p>
        </div>
      </div>
      <p v-if="items.length === 0" class="text-sm text-[--color-muted-foreground] italic col-span-full py-2">
        {{ emptyMessage }}
      </p>
    </div>
  </div>
</template>
