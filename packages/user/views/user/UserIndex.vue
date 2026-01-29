<script setup lang="ts">
import AdminLayout from '@admin/components/layout/DashboardLayout.vue'
import Button from '@admin/components/ui/Button.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { userService, type User } from '../../services/userService.ts'

const router = useRouter()
const users = ref<User[]>([])
const isLoading = ref(true)

const fetchUsers = async () => {
  try {
    isLoading.value = true
    const response = await userService.getAll()
    users.value = response.data
  } catch (error) {
    console.error('Hiba a felhasználók betöltésekor:', error)
  } finally {
    isLoading.value = false
  }
}

const deleteUser = async (id: number) => {
  if (!confirm('Biztosan törölni szeretné ezt a felhasználót?')) return

  try {
    await userService.delete(id)
    await fetchUsers()
  } catch (error) {
    console.error('Hiba a felhasználó törlésekor:', error)
  }
}

const editUser = (id: number) => {
  router.push(`/users/${id}/edit`)
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Felhasználók</h2>
      <div class="flex items-center space-x-2">
        <Button @click="router.push('/users/create')">Új felhasználó</Button>
      </div>
    </div>
    <div class="mt-4 border rounded-md p-4">
      <div v-if="isLoading" class="flex justify-center py-8">
        Betöltés...
      </div>
      <div v-else-if="users.length === 0" class="flex justify-center py-8 text-muted-foreground">
        Nincs megjeleníthető felhasználó.
      </div>
      <div v-else class="space-y-4">
        <div v-for="user in users" :key="user.id" class="flex items-center justify-between p-2 border-b last:border-0">
          <div class="flex gap-4 items-center">
            <span class="text-xs font-mono text-muted-foreground w-8">#{{ user.id }}</span>
            <div>
              <div class="font-medium">{{ user.name }}</div>
              <div class="text-sm text-muted-foreground">{{ user.email }}</div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span v-if="user.email_verified" class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Verified</span>
            <span v-else class="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Not Verified</span>
            <div class="flex gap-2">
              <Button variant="ghost" size="sm" @click="editUser(user.id!)">Szerkesztés</Button>
              <Button variant="destructive" size="sm" @click="deleteUser(user.id!)">Törlés</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
