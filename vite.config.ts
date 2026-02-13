import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@config': path.resolve(__dirname, './config'),
      '@admin': path.resolve(__dirname, './src/packages/vue-admin'),
      '@menu': path.resolve(__dirname, './src/packages/vue-menu'),
      '@user': path.resolve(__dirname, './src/packages/vue-user'),
      '@language': path.resolve(__dirname, './src/packages/vue-language'),
      '@media': path.resolve(__dirname, './src/packages/vue-media'),
      '@cms': path.resolve(__dirname, './src/packages/vue-cms'),
    },
  },
})
