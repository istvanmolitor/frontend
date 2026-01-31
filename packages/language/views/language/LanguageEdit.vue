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
import Checkbox from '@admin/components/ui/Checkbox.vue'
import FormButtons from '@admin/components/ui/FormButtons.vue'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { languageService, type Language, type LanguageFormData } from '../../services/languageService'

const router = useRouter()
const route = useRoute()
const isSaving = ref(false)
const isLoading = ref(true)
const availableLanguages = ref<Language[]>([])

const form = reactive<LanguageFormData>({
  code: '',
  enabled: true,
  translations: {}
})

const fetchData = async () => {
  try {
    isLoading.value = true
    const id = route.params.id as string
    const { data } = await languageService.getEditData(id)

    availableLanguages.value = data.availableLanguages
    form.code = data.data.code
    form.enabled = data.data.enabled

    // Inicializáljuk a fordításokat az adatokkal
    availableLanguages.value.forEach(lang => {
      if (lang.id) {
        form.translations[lang.id] = {
          name: data.data.translations?.[lang.id]?.name || ''
        }
      }
    })
  } catch (error) {
    console.error('Hiba az adatok betöltésekor:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  try {
    isSaving.value = true
    const id = route.params.id as string
    await languageService.update(id, form)
    router.push('/languages')
  } catch (error) {
    console.error('Hiba a nyelv frissítésekor:', error)
  } finally {
    isSaving.value = false
  }
}

const goBack = () => {
  router.push('/languages')
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between space-y-2 mb-4">
      <h2 class="text-3xl font-bold tracking-tight">Nyelv szerkesztése</h2>
      <Button variant="outline" @click="goBack">Vissza</Button>
    </div>

    <div v-if="isLoading" class="flex justify-center py-8">
      Betöltés...
    </div>

    <Card v-else class="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nyelv adatai</CardTitle>
        <CardDescription>Módosítsd a nyelv adatait.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="code" class="text-sm font-medium">Kód (pl. hu, en)</label>
            <Input id="code" v-model="form.code" placeholder="hu" />
          </div>
          <div class="flex items-center space-x-2 pt-8">
            <Checkbox id="enabled" :checked="form.enabled" @update:checked="(v) => form.enabled = v" />
            <label for="enabled" class="text-sm font-medium">Engedélyezve</label>
          </div>
        </div>

        <div class="space-y-4 pt-4 border-t">
          <h3 class="text-lg font-medium">Fordítások</h3>
          <div v-for="lang in availableLanguages" :key="lang.id" class="space-y-2">
            <label :for="'lang-' + lang.id" class="text-sm font-medium">Név ({{ lang.code }})</label>
            <Input :id="'lang-' + lang.id" v-model="form.translations[lang.id!].name" />
          </div>
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
