// Re-export menu system from @menu package
export { menuRegistry, getMenu, getMenuNames, findMenuItemById, useMenu, debugMenuRegistry, validateMenus, getMenuTree, searchMenusByTitle, exportMenusAsJSON, getMenuStats } from '@menu/index'
export type { MenuItemConfig, PackageMenuConfig, MenuBuilder } from '@menu/index'

// Components
export { default as AdminMenu } from './components/AdminMenu.vue'
export { default as ProfileMenu } from './components/layout/ProfileMenu.vue'

