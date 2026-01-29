<script setup lang="ts">
import Button from './Button.vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  total: number
  perPage: number
}>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const getPageNumbers = () => {
  const pages: (number | string)[] = []
  const maxVisible = 5

  if (props.totalPages <= maxVisible) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)

    if (props.currentPage > 3) {
      pages.push('...')
    }

    const start = Math.max(2, props.currentPage - 1)
    const end = Math.min(props.totalPages - 1, props.currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (props.currentPage < props.totalPages - 2) {
      pages.push('...')
    }

    pages.push(props.totalPages)
  }

  return pages
}
</script>

<template>
  <div class="flex items-center justify-between px-2 py-4 border-t">
    <div class="text-sm text-muted-foreground">
      Összesen {{ total }} elem ({{ currentPage }}. oldal / {{ totalPages }})
    </div>

    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Előző
      </Button>

      <div class="flex items-center gap-1">
        <template v-for="(page, index) in getPageNumbers()" :key="index">
          <Button
            v-if="page === '...'"
            variant="ghost"
            size="sm"
            disabled
          >
            ...
          </Button>
          <Button
            v-else
            :variant="page === currentPage ? 'default' : 'outline'"
            size="sm"
            @click="goToPage(page as number)"
          >
            {{ page }}
          </Button>
        </template>
      </div>

      <Button
        variant="outline"
        size="sm"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Következő
      </Button>
    </div>
  </div>
</template>
