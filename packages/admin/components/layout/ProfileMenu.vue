<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useMenu } from '@menu/composables/useMenu'
import { UserCircle, ChevronDown } from 'lucide-vue-next'

const router = useRouter()
const { menuItems } = useMenu('profile')

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const navigateTo = (path?: string) => {
  if (path) {
    router.push(path)
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      @click="toggleMenu"
      class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--color-accent]/10 transition-colors"
      aria-label="Profile menu"
    >
      <UserCircle :size="20" class="text-[--color-foreground]" />
      <ChevronDown
        :size="16"
        class="text-[--color-muted-foreground] transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 rounded-lg bg-[--color-card] shadow-xl border border-[--color-border] overflow-hidden z-[500] isolate bg-white dark:bg-slate-950"
      >
        <div class="py-1">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="navigateTo(item.path)"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[--color-foreground] hover:bg-[--color-accent]/10 transition-colors text-left"
          >
            <component v-if="item.icon" :is="item.icon" :size="18" class="text-[--color-muted-foreground]" />
            <span>{{ item.title }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
