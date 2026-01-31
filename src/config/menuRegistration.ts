/**
 * Menu Registration
 * This file registers all menu builders with the menu registry
 */
import { menuRegistry } from '@menu/index'
import { userMenuBuilder } from '@user/config/menuBuilder'
import { languageMenuBuilder } from '@language/config/menuBuilder'

/**
 * Register all menu builders
 * This should be called during application initialization
 */
export function registerMenus(): void {
  // Register user menu builder for the 'admin' menu
  menuRegistry.register('admin', userMenuBuilder)

  // Register user menu builder for the 'profile' menu
  menuRegistry.register('profile', userMenuBuilder)

  // Register language menu builder for the 'admin' menu
  menuRegistry.register('admin', languageMenuBuilder)
}

export default registerMenus
