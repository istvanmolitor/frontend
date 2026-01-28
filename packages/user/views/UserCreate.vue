<script setup lang="ts">
import AdminLayout from '@admin/layouts/AdminLayout.vue'
import { Button } from '@admin/ui/button'
import { Input } from '@admin/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@admin/ui/card'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { userService } from '../services/userService'

const router = useRouter()
const isSaving = ref(false)

const form = reactive({
  name: '',
  email: '',
  role: 'User'
})

const handleSubmit = async () => {
  try {
    isSaving.value = true
    await userService.create(form)
    router.push('/users')
  } catch (error) {
    console.error('Hiba a felhasználó létrehozásakor:', error)
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.push('/users')
}
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between space-y-2 mb-4">
      <h2 class="text-3xl font-bold tracking-tight">Új felhasználó</h2>
      <Button variant="outline" @click="goBack">Vissza</Button>
    </div>

    <Card class="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Felhasználói adatok</CardTitle>
        <CardDescription>Add meg az új felhasználó adatait a létrehozáshoz.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium">Név</label>
          <Input id="name" v-model="form.name" placeholder="Minta János" />
        </div>
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <Input id="email" v-model="form.email" type="email" placeholder="janos@example.com" />
        </div>
        <div class="space-y-2">
          <label for="role" class="text-sm font-medium">Szerepkör</label>
          <select
            id="role"
            v-model="form.role"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Editor">Editor</option>
          </select>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end gap-2">
        <Button variant="ghost" :disabled="isSaving" @click="goBack">Mégse</Button>
        <Button :disabled="isSaving" @click="handleSubmit">
          {{ isSaving ? 'Mentés...' : 'Mentés' }}
        </Button>
      </CardFooter>
    </Card>
  </AdminLayout>
</template>
