/**
 * Menu Registration
 * This file registers all menu builders with the menu registry
 */
import { menuRegistry } from '@admin/index'
import { userMenuBuilder } from '@user/config/menuBuilder'

/**
 * Register all menu builders
 * This should be called during application initialization
 */
export function registerMenus(): void {
  // Register user menu builder for the 'admin' menu
  menuRegistry.register('admin', userMenuBuilder)

  // Add more menu builder registrations here as needed
  // Example:
  // menuRegistry.register('admin', otherMenuBuilder)
}

export default registerMenus
