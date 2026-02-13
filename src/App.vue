<script setup lang="ts">
import DashboardLayout from '@admin/components/layout/DashboardLayout.vue'
import HelloWorld from './components/HelloWorld.vue'
import '@admin/style.css'
</script>

<template>
  <router-view />
</template>

<style>
/* Reset basic styles that might conflict with layout */
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
