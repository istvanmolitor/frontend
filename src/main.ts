import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerMenus } from './config/menuRegistration'

// Register all menu builders
registerMenus()


// Enable debug utilities in development
if (import.meta.env.DEV) {
  import('@admin/lib/menuDebug')
}

const app = createApp(App)
app.use(router)
app.mount('#app')
