<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.ts'
import Card from '@admin/components/ui/Card.vue'
import CardContent from '@admin/components/ui/CardContent.vue'
import CardDescription from '@admin/components/ui/CardDescription.vue'
import CardHeader from '@admin/components/ui/CardHeader.vue'
import CardTitle from '@admin/components/ui/CardTitle.vue'
import Button from '@admin/components/ui/Button.vue'

const router = useRouter()
const { user, loading, logout, fetchUser } = useAuth()

const error = ref<string | null>(null)

onMounted(async () => {
  try {
    await fetchUser()
  } catch (err: any) {
    error.value = err.message || 'Failed to load user data'
  }
})

const handleLogout = async () => {
  try {
    await logout()
    router.push('/login')
  } catch (err: any) {
    error.value = err.message || 'Logout failed'
  }
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Not verified'
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
    <div class="max-w-4xl mx-auto py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-4 rounded-lg bg-red-50 border border-red-200">
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- User Profile -->
      <div v-else-if="user">
        <Card class="shadow-xl">
          <CardHeader>
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Profile
                </CardTitle>
                <CardDescription>
                  Your account information
                </CardDescription>
              </div>
              <Button
                @click="handleLogout"
                variant="destructive"
                class="bg-red-500 hover:bg-red-600"
              >
                Logout
              </Button>
            </div>
          </CardHeader>

          <CardContent class="space-y-6">
            <!-- User Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ user.name }}</p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ user.email }}</p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Email Verified</label>
                <p class="text-lg">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      user.email_verified
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    ]"
                  >
                    {{ user.email_verified ? 'Verified' : 'Not Verified' }}
                  </span>
                </p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Verified At</label>
                <p class="text-lg text-gray-700 dark:text-gray-300">
                  {{ formatDate(user.email_verified_at) }}
                </p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</label>
                <p class="text-lg text-gray-700 dark:text-gray-300">
                  {{ formatDate(user.created_at) }}
                </p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</label>
                <p class="text-lg text-gray-700 dark:text-gray-300">#{{ user.id }}</p>
              </div>
            </div>

            <!-- User Groups -->
            <div v-if="user.user_groups && user.user_groups.length > 0" class="space-y-3">
              <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Groups</label>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="group in user.user_groups"
                  :key="group.id"
                  class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {{ group.name }}
                  <span v-if="group.is_default" class="ml-2 text-xs">(Default)</span>
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-4 border-t">
              <Button variant="outline" @click="router.push('/users')">
                View All Users
              </Button>
              <Button variant="outline" @click="fetchUser">
                Refresh Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
