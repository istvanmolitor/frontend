<script setup lang="ts">
import AdminLayout from '@admin/components/layout/DashboardLayout.vue'
import Button from '@admin/components/ui/Button.vue'
import Input from '@admin/components/ui/Input.vue'
import Textarea from '@admin/components/ui/Textarea.vue'
import Card from '@admin/components/ui/Card.vue'
import CardContent from '@admin/components/ui/CardContent.vue'
import CardDescription from '@admin/components/ui/CardDescription.vue'
import CardFooter from '@admin/components/ui/CardFooter.vue'
import CardHeader from '@admin/components/ui/CardHeader.vue'
import CardTitle from '@admin/components/ui/CardTitle.vue'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { permissionService } from '../../services/permissionService.ts'

const router = useRouter()
const route = useRoute()
const isSaving = ref(false)
const isLoading = ref(true)

const form = reactive({
  name: '',
  description: ''
})

const fetchPermission = async () => {
  const id = route.params.id as string
  try {
    isLoading.value = true
    const response = await permissionService.getById(id)
    const permission = response.data.data

    form.name = permission.name
    form.description = permission.description || ''
  } catch (error) {
    console.error('Hiba a jogosultság betöltésekor:', error)
    router.push('/permissions')
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  const id = route.params.id as string
  try {
    isSaving.value = true
    await permissionService.update(id, {
      name: form.name,
      description: form.description || null
    })
    router.push('/permissions')
  } catch (error) {
    console.error('Hiba a jogosultság frissítésekor:', error)
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.push('/permissions')
}

onMounted(() => {
  fetchPermission()
})
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between space-y-2 mb-4">
      <h2 class="text-3xl font-bold tracking-tight">Jogosultság szerkesztése</h2>
      <Button variant="outline" @click="goBack">Vissza</Button>
    </div>

    <div v-if="isLoading" class="flex justify-center py-8">
      Betöltés...
    </div>

    <Card v-else class="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Jogosultság adatai</CardTitle>
        <CardDescription>Módosítsd a jogosultság adatait.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium">Név *</label>
          <Input id="name" v-model="form.name" placeholder="Pl. users.create" />
        </div>
        <div class="space-y-2">
          <label for="description" class="text-sm font-medium">Leírás</label>
          <Textarea id="description" v-model="form.description" placeholder="Opcionális leírás..." :rows="3" />
        </div>
      </CardContent>
      <CardFooter class="flex justify-end gap-2">
        <Button variant="ghost" :disabled="isSaving" @click="goBack">Mégse</Button>
        <Button :disabled="isSaving || !form.name" @click="handleSubmit">
          {{ isSaving ? 'Mentés...' : 'Mentés' }}
        </Button>
      </CardFooter>
    </Card>
  </AdminLayout>
</template>
