<script setup lang="ts">
import { Bell, Search, Moon, Sun } from 'lucide-vue-next'
import { ref } from 'vue'
import Button from '../ui/Button.vue'
import ProfileMenu from './ProfileMenu.vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <header class="bg-[--color-card]/80 backdrop-blur-xl border-b border-[--color-border]/50 px-6 py-4 shadow-lg relative overflow-visible">
    <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
    <div class="flex items-center justify-between relative z-10">
      <!-- Search -->
      <div class="flex-1 max-w-xl">
        <div class="relative group">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[--color-muted-foreground] group-hover:text-blue-500 transition-colors" :size="18" />
          <input
            type="text"
            placeholder="Keresés..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[--color-input] bg-[--color-background]/50 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-sm hover:shadow-md"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="icon" @click="toggleTheme" class="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:scale-110 transition-all duration-200">
          <Sun v-if="isDark" :size="20" class="text-yellow-500" />
          <Moon v-else :size="20" class="text-blue-500" />
        </Button>

        <Button variant="ghost" size="icon" class="relative hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:scale-110 transition-all duration-200 group">
          <Bell :size="20" class="group-hover:animate-pulse" />
          <span class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></span>
        </Button>

        <ProfileMenu />
      </div>
    </div>
  </header>
</template>
