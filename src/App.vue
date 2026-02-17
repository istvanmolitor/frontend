<script setup lang="ts">
import { DevErrorModal, useDevError } from '@admin/index'
import '@admin/style.css'

const { devErrorState, closeDevError } = useDevError()
</script>

<template>
  <router-view />
  <DevErrorModal
    :open="devErrorState.isOpen"
    :error="devErrorState.error"
    @update:open="closeDevError"
  />
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
