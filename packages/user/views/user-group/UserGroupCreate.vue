<script setup lang="ts">
import AdminLayout from '@admin/components/layout/DashboardLayout.vue'
import Button from '@admin/components/ui/Button.vue'
import Input from '@admin/components/ui/Input.vue'
import Textarea from '@admin/components/ui/Textarea.vue'
import Checkbox from '@admin/components/ui/Checkbox.vue'
import Card from '@admin/components/ui/Card.vue'
import CardContent from '@admin/components/ui/CardContent.vue'
import CardDescription from '@admin/components/ui/CardDescription.vue'
import CardFooter from '@admin/components/ui/CardFooter.vue'
import CardHeader from '@admin/components/ui/CardHeader.vue'
import CardTitle from '@admin/components/ui/CardTitle.vue'
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { userGroupService, type Permission } from '../../services/userGroupService.ts'

const router = useRouter()
const isSaving = ref(false)
const isLoading = ref(true)
const availablePermissions = ref<Permission[]>([])

const form = reactive({
  name: '',
  description: '',
  is_default: false,
  permissions: [] as number[]
})

const fetchCreateData = async () => {
  try {
    isLoading.value = true
    const response = await userGroupService.getCreateData()
    availablePermissions.value = response.data.permissions
  } catch (error) {
    console.error('Hiba a jogosultságok betöltésekor:', error)
  } finally {
    isLoading.value = false
  }
}

const togglePermission = (permissionId: number) => {
  const index = form.permissions.indexOf(permissionId)
  if (index > -1) {
    form.permissions.splice(index, 1)
  } else {
    form.permissions.push(permissionId)
  }
}

const isPermissionSelected = (permissionId: number) => {
  return form.permissions.includes(permissionId)
}

const handleSubmit = async () => {
  try {
    isSaving.value = true
    await userGroupService.create({
      name: form.name,
      description: form.description || null,
      is_default: form.is_default,
      permissions: form.permissions
    })
    router.push('/user-groups')
  } catch (error) {
    console.error('Hiba a felhasználói csoport létrehozásakor:', error)
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.push('/user-groups')
}

onMounted(() => {
  fetchCreateData()
})
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between space-y-2 mb-4">
      <h2 class="text-3xl font-bold tracking-tight">Új felhasználói csoport</h2>
      <Button variant="outline" @click="goBack">Vissza</Button>
    </div>

    <div v-if="isLoading" class="flex justify-center py-8">
      Betöltés...
    </div>

    <Card v-else class="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Csoport adatai</CardTitle>
        <CardDescription>Add meg az új felhasználói csoport adatait.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium">Név *</label>
          <Input id="name" v-model="form.name" placeholder="Pl. Adminisztrátorok" />
        </div>
        <div class="space-y-2">
          <label for="description" class="text-sm font-medium">Leírás</label>
          <Textarea id="description" v-model="form.description" placeholder="Opcionális leírás..." rows="3" />
        </div>
        <div class="flex items-center space-x-2">
          <Checkbox id="is_default" :checked="form.is_default" @update:checked="form.is_default = $event" />
          <label for="is_default" class="text-sm font-medium cursor-pointer">
            Alapértelmezett csoport
          </label>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">Jogosultságok</label>
          <div class="border rounded-md p-4 space-y-2 max-h-64 overflow-y-auto">
            <div v-if="availablePermissions.length === 0" class="text-sm text-muted-foreground">
              Nincsenek elérhető jogosultságok.
            </div>
            <div v-else v-for="permission in availablePermissions" :key="permission.id" class="flex items-start space-x-2">
              <Checkbox
                :id="`perm-${permission.id}`"
                :checked="isPermissionSelected(permission.id)"
                @update:checked="togglePermission(permission.id)"
              />
              <label :for="`perm-${permission.id}`" class="text-sm cursor-pointer">
                <div class="font-medium">{{ permission.name }}</div>
                <div v-if="permission.description" class="text-xs text-muted-foreground">
                  {{ permission.description }}
                </div>
              </label>
            </div>
          </div>
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
