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
      '@menu': path.resolve(__dirname, './src/packages/ts-menu'),
      '@user': path.resolve(__dirname, './src/packages/vue-user'),
      '@language': path.resolve(__dirname, './src/packages/vue-language'),
      '@media': path.resolve(__dirname, './src/packages/vue-media'),
      '@cms': path.resolve(__dirname, './src/packages/vue-cms'),
      '@rss-watcher': path.resolve(__dirname, './src/packages/vue-rss-watcher'),
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
