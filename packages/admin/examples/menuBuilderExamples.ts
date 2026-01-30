/**
 * Menu Builder Pattern - Usage Examples
 *
 * This file demonstrates how to use the menu builder pattern
 */

import { menuRegistry } from '@menu/index'
import type { MenuBuilder, MenuItemConfig } from '@menu/index'
import { Settings, Home, Package } from 'lucide-vue-next'

/**
 * Example 1: Simple Menu Builder
 * Builds a settings menu section
 */
export class SettingsMenuBuilder implements MenuBuilder {
  build(menu: MenuItemConfig, menuName: string): MenuItemConfig {
    const settingsSection: MenuItemConfig = {
      id: 'settings',
      title: 'Beállítások',
      icon: Settings,
      order: 100,
      children: [
        {
          id: 'general-settings',
          title: 'Általános',
          path: '/settings/general',
          order: 10
        },
        {
          id: 'advanced-settings',
          title: 'Haladó',
          path: '/settings/advanced',
          order: 20
        }
      ]
    }

    if (!menu.children) {
      menu.children = []
    }
    menu.children.push(settingsSection)

    // Sort children by order
    menu.children.sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER
      return orderA - orderB
    })

    return menu
  }
}

/**
 * Example 2: Dashboard Menu Builder
 * Builds a dashboard section with nested items
 */
export class DashboardMenuBuilder implements MenuBuilder {
  build(menu: MenuItemConfig, menuName: string): MenuItemConfig {
    const dashboardSection: MenuItemConfig = {
      id: 'dashboard',
      title: 'Irányítópult',
      icon: Home,
      order: 1,
      children: [
        {
          id: 'overview',
          title: 'Áttekintés',
          path: '/dashboard/overview',
          order: 1
        },
        {
          id: 'analytics',
          title: 'Analitika',
          path: '/dashboard/analytics',
          order: 2
        },
        {
          id: 'reports',
          title: 'Riportok',
          path: '/dashboard/reports',
          order: 3
        }
      ]
    }

    if (!menu.children) {
      menu.children = []
    }
    menu.children.push(dashboardSection)

    menu.children.sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER
      return orderA - orderB
    })

    return menu
  }
}

/**
 * Example 3: Products Menu Builder
 * Demonstrates how to add product management to the menu
 */
export class ProductsMenuBuilder implements MenuBuilder {
  build(menu: MenuItemConfig, menuName: string): MenuItemConfig {
    const productsSection: MenuItemConfig = {
      id: 'products',
      title: 'Termékek',
      icon: Package,
      order: 30,
      children: [
        {
          id: 'product-list',
          title: 'Terméklista',
          path: '/products',
          order: 10
        },
        {
          id: 'categories',
          title: 'Kategóriák',
          path: '/products/categories',
          order: 20
        },
        {
          id: 'inventory',
          title: 'Készlet',
          path: '/products/inventory',
          order: 30
        }
      ]
    }

    if (!menu.children) {
      menu.children = []
    }
    menu.children.push(productsSection)

    menu.children.sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER
      return orderA - orderB
    })

    return menu
  }
}

/**
 * Example 4: Conditional Menu Builder
 * Only adds items based on conditions
 */
export class ConditionalMenuBuilder implements MenuBuilder {
  constructor(private includeAdvanced: boolean = false) {}

  build(menu: MenuItemConfig, menuName: string): MenuItemConfig {
    if (!this.includeAdvanced) {
      return menu // Don't modify menu if condition not met
    }

    const advancedSection: MenuItemConfig = {
      id: 'advanced',
      title: 'Haladó Funkciók',
      icon: Settings,
      order: 90,
      permission: 'admin.advanced',
      children: [
        {
          id: 'system-logs',
          title: 'Rendszer Naplók',
          path: '/advanced/logs',
          order: 10
        }
      ]
    }

    if (!menu.children) {
      menu.children = []
    }
    menu.children.push(advancedSection)

    menu.children.sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER
      return orderA - orderB
    })

    return menu
  }
}

/**
 * Example Usage in menuRegistration.ts:
 *
 * import { menuRegistry } from '@menu/index'
 * import { userMenuBuilder } from '@user/config/menuBuilder'
 * import { SettingsMenuBuilder, DashboardMenuBuilder } from './menuBuilders'
 *
 * export function registerMenus(): void {
 *   // Register user menu builder
 *   menuRegistry.register('admin', userMenuBuilder)
 *
 *   // Register dashboard builder
 *   menuRegistry.register('admin', new DashboardMenuBuilder())
 *
 *   // Register settings builder
 *   menuRegistry.register('admin', new SettingsMenuBuilder())
 *
 *   // Register conditional builder
 *   const isAdmin = true // or check user role
 *   menuRegistry.register('admin', new ConditionalMenuBuilder(isAdmin))
 * }
 */

/**
 * Example: Getting a menu in a component
 *
 * import { useMenu } from '@menu/index'
 *
 * const { menuItems } = useMenu('admin')
 *
 * // menuItems now contains all sections built by registered builders
 */

/**
 * Example: Multiple menus
 * You can have different menus for different contexts
 *
 * menuRegistry.register('admin', userMenuBuilder)
 * menuRegistry.register('admin', dashboardBuilder)
 *
 * menuRegistry.register('settings', settingsBuilder)
 * menuRegistry.register('settings', advancedSettingsBuilder)
 *
 * // Then in components:
 * const { menuItems: adminMenuItems } = useMenu('admin')
 * const { menuItems: settingsMenuItems } = useMenu('settings')
 */
