import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@admin': path.resolve(__dirname, './src/packages/vue-admin'),
      '@menu': path.resolve(__dirname, './src/packages/vue-menu'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-router': ['vue-router'],
          'lucide-vue': ['lucide-vue-next'],
          'vendor': ['vue', 'tailwindcss'],
        },
      },
    },
  },
})
