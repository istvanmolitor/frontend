/**
 * Menu Registration
 * This file registers all menu builders with the menu registry
 */
import { menuRegistry } from '@menu/index'
import { userMenuBuilder } from '@user/index'
import { languageMenuBuilder } from '@language/config/menuBuilder'
import { cmsMenuBuilder } from '@cms/config/menuBuilder'
import { mediaMenuBuilder } from '@media/index'

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

  // Register CMS menu builder for the 'admin' menu
  menuRegistry.register('admin', cmsMenuBuilder)

  // Register media menu builder for the 'admin' menu
  menuRegistry.register('admin', mediaMenuBuilder)
}

export default registerMenus
