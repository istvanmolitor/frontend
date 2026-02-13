<script setup lang="ts">
import { ref } from 'vue'
import {getBaseUrl} from "@admin/lib/utils.ts";

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  {{ getBaseUrl() }}
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
