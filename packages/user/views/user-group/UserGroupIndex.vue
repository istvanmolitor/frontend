<script setup lang="ts">
import AdminLayout from '@admin/components/layout/DashboardLayout.vue'
import Button from '@admin/components/ui/Button.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { userGroupService, type UserGroup } from '../../services/userGroupService.ts'

const router = useRouter()
const userGroups = ref<UserGroup[]>([])
const isLoading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)
const total = ref(0)

const fetchUserGroups = async (page = 1) => {
  try {
    isLoading.value = true
    const response = await userGroupService.getAll({ page })
    userGroups.value = response.data.data
    currentPage.value = response.data.meta.current_page
    totalPages.value = response.data.meta.last_page
    total.value = response.data.meta.total
  } catch (error) {
    console.error('Hiba a felhasználói csoportok betöltésekor:', error)
  } finally {
    isLoading.value = false
  }
}

const deleteUserGroup = async (id: number) => {
  if (!confirm('Biztosan törölni szeretné ezt a felhasználói csoportot?')) return

  try {
    await userGroupService.delete(id)
    await fetchUserGroups(currentPage.value)
  } catch (error) {
    console.error('Hiba a felhasználói csoport törlésekor:', error)
  }
}

const editUserGroup = (id: number) => {
  router.push(`/user-groups/${id}/edit`)
}

const goToPage = (page: number) => {
  fetchUserGroups(page)
}

onMounted(() => {
  fetchUserGroups()
})
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Felhasználói csoportok</h2>
      <div class="flex items-center space-x-2">
        <Button @click="router.push('/user-groups/create')">Új csoport</Button>
      </div>
    </div>
    <div class="mt-4 border rounded-md p-4">
      <div v-if="isLoading" class="flex justify-center py-8">
        Betöltés...
      </div>
      <div v-else-if="userGroups.length === 0" class="flex justify-center py-8 text-muted-foreground">
        Nincs megjeleníthető felhasználói csoport.
      </div>
      <div v-else class="space-y-4">
        <div v-for="group in userGroups" :key="group.id" class="flex items-center justify-between p-2 border-b last:border-0">
          <div class="flex gap-4 items-center">
            <span class="text-xs font-mono text-muted-foreground w-8">#{{ group.id }}</span>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-medium">{{ group.name }}</span>
                <span v-if="group.is_default" class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Alapértelmezett</span>
              </div>
              <div v-if="group.description" class="text-sm text-muted-foreground">{{ group.description }}</div>
              <div v-if="group.permissions && group.permissions.length > 0" class="text-xs text-muted-foreground mt-1">
                Jogosultságok: {{ group.permissions.length }} db
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <Button variant="ghost" size="sm" @click="editUserGroup(group.id!)">Szerkesztés</Button>
            <Button variant="destructive" size="sm" @click="deleteUserGroup(group.id!)">Törlés</Button>
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
