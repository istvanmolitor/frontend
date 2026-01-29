<script setup lang="ts">
import AdminLayout from '@admin/components/layout/DashboardLayout.vue'
import Button from '@admin/components/ui/Button.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { permissionService, type Permission } from '../../services/permissionService.ts'

const router = useRouter()
const permissions = ref<Permission[]>([])
const isLoading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)
const total = ref(0)

const fetchPermissions = async (page = 1) => {
  try {
    isLoading.value = true
    const response = await permissionService.getAll({ page })
    permissions.value = response.data.data
    currentPage.value = response.data.meta.current_page
    totalPages.value = response.data.meta.last_page
    total.value = response.data.meta.total
  } catch (error) {
    console.error('Hiba a jogosultságok betöltésekor:', error)
  } finally {
    isLoading.value = false
  }
}

const deletePermission = async (id: number) => {
  if (!confirm('Biztosan törölni szeretné ezt a jogosultságot?')) return

  try {
    await permissionService.delete(id)
    await fetchPermissions(currentPage.value)
  } catch (error) {
    console.error('Hiba a jogosultság törlésekor:', error)
  }
}

const editPermission = (id: number) => {
  router.push(`/permissions/${id}/edit`)
}

const goToPage = (page: number) => {
  fetchPermissions(page)
}

onMounted(() => {
  fetchPermissions()
})
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Jogosultságok</h2>
      <div class="flex items-center space-x-2">
        <Button @click="router.push('/permissions/create')">Új jogosultság</Button>
      </div>
    </div>
    <div class="mt-4 border rounded-md p-4">
      <div v-if="isLoading" class="flex justify-center py-8">
        Betöltés...
      </div>
      <div v-else-if="permissions.length === 0" class="flex justify-center py-8 text-muted-foreground">
        Nincs megjeleníthető jogosultság.
      </div>
      <div v-else class="space-y-4">
        <div v-for="permission in permissions" :key="permission.id" class="flex items-center justify-between p-2 border-b last:border-0">
          <div class="flex gap-4 items-center">
            <span class="text-xs font-mono text-muted-foreground w-8">#{{ permission.id }}</span>
            <div>
              <div class="font-medium">{{ permission.name }}</div>
              <div v-if="permission.description" class="text-sm text-muted-foreground">{{ permission.description }}</div>
              <div v-if="permission.user_groups && permission.user_groups.length > 0" class="text-xs text-muted-foreground mt-1">
                Csoportok: {{ permission.user_groups.length }} db
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Button variant="ghost" size="sm" @click="editPermission(permission.id!)">Szerkesztés</Button>
            <Button variant="destructive" size="sm" @click="deletePermission(permission.id!)">Törlés</Button>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-4 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            Előző
          </Button>
          <span class="text-sm text-muted-foreground">
            {{ currentPage }} / {{ totalPages }} ({{ total }} elem)
          </span>
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
    </div>
  </AdminLayout>
</template>
