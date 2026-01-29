import { menuRegistry } from './menuRegistry'
import { userMenuConfig } from '@user/config/menu'

/**
 * Initialize admin menu system
 * Registers all package menus
 */
export function initializeMenu(): void {
  // Register user package menu
  menuRegistry.register(userMenuConfig)

  // Future packages can be registered here:
  // menuRegistry.register(settingsMenuConfig)
  // menuRegistry.register(reportsMenuConfig)
  // etc.
}

/**
 * Get the current menu items
 */
export function getMenuItems() {
  return menuRegistry.getMenuItems()
}

export default initializeMenu
