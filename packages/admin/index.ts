// Menu system
export { menuRegistry } from './config/menuRegistry'
export { getMenu, getMenuNames, findMenuItemById } from './config/menuInitializer'

// Components
export { default as AdminMenu } from './components/AdminMenu.vue'

// Composables
export { useMenu } from './composables/useMenu'

// Debug utilities (only use in development)
export { debugMenuRegistry, validateMenus, getMenuTree, searchMenusByTitle, exportMenusAsJSON, getMenuStats } from './lib/menuDebug'

// Types
export type { MenuItemConfig, PackageMenuConfig, MenuBuilder } from './types/menu'
