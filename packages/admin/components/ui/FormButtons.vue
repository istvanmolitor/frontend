<script setup lang="ts">
import Button from './Button.vue'

interface Props {
  isSaving?: boolean
  saveLabel?: string
  cancelLabel?: string
  saveDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSaving: false,
  saveLabel: 'Mentés',
  cancelLabel: 'Mégse',
  saveDisabled: false
})

defineEmits<{
  (e: 'save'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div class="flex w-full justify-end gap-2">
    <Button
      variant="outline"
      type="button"
      :disabled="isSaving"
      @click="$emit('cancel')"
    >
      {{ cancelLabel }}
    </Button>
    <Button
      type="button"
      variant="default"
      class="min-w-[100px] shadow-md"
      :disabled="isSaving || saveDisabled"
      @click="$emit('save')"
    >
      {{ isSaving ? `${saveLabel}...` : saveLabel }}
    </Button>
  </div>
</template>
