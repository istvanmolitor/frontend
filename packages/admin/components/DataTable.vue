<script setup lang="ts" generic="T extends Record<string, any>">
import { ref, onMounted } from 'vue'
import SearchInput from './ui/SearchInput.vue'
import TablePagination from './ui/TablePagination.vue'

export interface Column<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (row: T) => string | number | null
  width?: string
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

const props = defineProps<{
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  pagination?: PaginationMeta
  defaultSort?: string
  defaultDirection?: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  'fetch': [params: {
    search?: string
    sort?: string
    direction?: 'asc' | 'desc'
    page?: number
  }]
  'row-click': [row: T]
}>()

const search = ref('')
const sortColumn = ref(props.defaultSort || '')
const sortDirection = ref<'asc' | 'desc'>(props.defaultDirection || 'asc')

const fetchData = (page?: number) => {
  const params: any = {}

  if (search.value) {
    params.search = search.value
  }

  if (sortColumn.value) {
    params.sort = sortColumn.value
    params.direction = sortDirection.value
  }

  if (page) {
    params.page = page
  }

  emit('fetch', params)
}

const handleSearch = (value: string) => {
  search.value = value
  fetchData(1)
}

const handleSort = (column: Column<T>) => {
  if (!column.sortable) return

  const key = String(column.key)

  if (sortColumn.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = key
    sortDirection.value = 'asc'
  }

  fetchData(1)
}

const handlePageChange = (page: number) => {
  fetchData(page)
}

const getCellValue = (row: T, column: Column<T>) => {
  if (column.render) {
    return column.render(row)
  }
  return row[column.key as keyof T]
}

const getSortIcon = (column: Column<T>) => {
  if (!column.sortable) return ''

  const key = String(column.key)
  if (sortColumn.value !== key) return '↕'
  return sortDirection.value === 'asc' ? '↑' : '↓'
}

// Automatically fetch data on mount
onMounted(() => {
  fetchData(1)
})
</script>

<template>
  <div class="space-y-4">
    <!-- Search -->
    <div v-if="searchable" class="flex items-center gap-4">
      <SearchInput
        v-model="search"
        :placeholder="searchPlaceholder"
        @search="handleSearch"
        class="max-w-sm"
      />
      <slot name="actions"></slot>
    </div>

    <!-- Table -->
    <div class="border rounded-md">
      <div v-if="loading" class="flex justify-center py-8">
        Betöltés...
      </div>
      <div v-else-if="data.length === 0" class="flex justify-center py-8 text-muted-foreground">
        <slot name="empty">
          Nincs megjeleníthető adat.
        </slot>
      </div>
      <table v-else class="w-full">
        <thead class="border-b bg-muted/50">
          <tr>
            <th
              v-for="column in columns"
              :key="String(column.key)"
              :class="[
                'px-4 py-3 text-left text-sm font-medium',
                column.sortable ? 'cursor-pointer hover:bg-muted select-none' : ''
              ]"
              :style="column.width ? `width: ${column.width}` : ''"
              @click="handleSort(column)"
            >
              <div class="flex items-center gap-2">
                {{ column.label }}
                <span v-if="column.sortable" class="text-muted-foreground">
                  {{ getSortIcon(column) }}
                </span>
              </div>
            </th>
            <th class="px-4 py-3 text-right text-sm font-medium" style="width: 150px">
              <slot name="header-actions">Műveletek</slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="border-b last:border-0 hover:bg-muted/50 transition-colors"
            @click="emit('row-click', row)"
          >
            <td
              v-for="column in columns"
              :key="String(column.key)"
              class="px-4 py-3 text-sm"
            >
              <slot :name="`cell-${String(column.key)}`" :row="row" :value="getCellValue(row, column)">
                {{ getCellValue(row, column) }}
              </slot>
            </td>
            <td class="px-4 py-3 text-sm text-right">
              <slot name="row-actions" :row="row"></slot>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <TablePagination
        v-if="pagination && pagination.last_page > 1"
        :current-page="pagination.current_page"
        :total-pages="pagination.last_page"
        :total="pagination.total"
        :per-page="pagination.per_page"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>
