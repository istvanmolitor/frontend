<script setup lang="ts">
import AdminLayout from '@admin/components/layout/DashboardLayout.vue'
import Button from '@admin/components/ui/Button.vue'
import Input from '@admin/components/ui/Input.vue'
import Card from '@admin/components/ui/Card.vue'
import CardContent from '@admin/components/ui/CardContent.vue'
import CardDescription from '@admin/components/ui/CardDescription.vue'
import CardFooter from '@admin/components/ui/CardFooter.vue'
import CardHeader from '@admin/components/ui/CardHeader.vue'
import CardTitle from '@admin/components/ui/CardTitle.vue'
import FormButtons from '@admin/components/ui/FormButtons.vue'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { contentRegionService, type ContentRegionFormData } from '../../services/contentRegionService.ts'

const router = useRouter()
const isSaving = ref(false)

const form = reactive<ContentRegionFormData>({
  name: ''
})

const handleSubmit = async () => {
  try {
    isSaving.value = true
    await contentRegionService.create(form)
    router.push('/cms/regions')
  } catch (error) {
    console.error('Hiba a régió létrehozásakor:', error)
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.push('/cms/regions')
}
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between space-y-2 mb-4">
      <h2 class="text-3xl font-bold tracking-tight">Új régió</h2>
      <Button variant="outline" @click="goBack">Vissza</Button>
    </div>

    <Card class="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Régió adatai</CardTitle>
        <CardDescription>Add meg az új tartalom régió adatait a létrehozáshoz.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium">Név</label>
          <Input id="name" v-model="form.name" placeholder="Régió neve" />
        </div>
      </CardContent>
      <CardFooter>
        <FormButtons
          :is-saving="isSaving"
          @save="handleSubmit"
          @cancel="goBack"
        />
      </CardFooter>
    </Card>
  </AdminLayout>
</template>
