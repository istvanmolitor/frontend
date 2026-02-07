<script setup lang="ts">
import Button from './Button.vue'
import Icon from './Icon.vue'

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
      <Icon name="x" :size="16" class="mr-2" />
      {{ cancelLabel }}
    </Button>
    <Button
      type="submit"
      variant="default"
      class="min-w-[100px] shadow-md btn btn-primary"
      :disabled="isSaving || saveDisabled"
      @click="$emit('save')"
    >
      <Icon :name="isSaving ? 'loader' : 'save'" :size="16" :class="['mr-2', isSaving ? 'animate-spin' : '']" />
      {{ isSaving ? `${saveLabel}...` : saveLabel }}
    </Button>
  </div>
</template>
