import type { MenuItemConfig } from '@admin/types/menu'
import { Home, LayoutDashboard } from 'lucide-vue-next'

/**
 * Central menu registry for the admin panel
 * Allows packages to register their menu items
 */
class MenuRegistry {
  private menuItems: MenuItemConfig[] = []

  /**
   * Register menu items from a package
   * @param items Menu items to register
   */
  register(items: MenuItemConfig | MenuItemConfig[]): void {
    const itemsArray = Array.isArray(items) ? items : [items]
    this.menuItems.push(...itemsArray)
  }

  /**
   * Get all registered menu items, sorted by order
   * @returns Sorted menu items
   */
  getMenuItems(): MenuItemConfig[] {
    return this.sortMenuItems([...this.menuItems])
  }

  /**
   * Recursively sort menu items and their children by order
   */
  private sortMenuItems(items: MenuItemConfig[]): MenuItemConfig[] {
    const sorted = items.sort((a, b) => {
      const orderA = a.order ?? 999
      const orderB = b.order ?? 999
      return orderA - orderB
    })

    // Sort children recursively
    sorted.forEach(item => {
      if (item.children && item.children.length > 0) {
        item.children = this.sortMenuItems(item.children)
      }
    })

    return sorted
  }

  /**
   * Clear all registered menu items (mainly for testing)
   */
  clear(): void {
    this.menuItems = []
  }

  /**
   * Get flattened list of all menu items (including nested)
   * Useful for permission checking
   */
  getFlattenedItems(): MenuItemConfig[] {
    const flatten = (items: MenuItemConfig[]): MenuItemConfig[] => {
      const result: MenuItemConfig[] = []

      items.forEach(item => {
        result.push(item)
        if (item.children && item.children.length > 0) {
          result.push(...flatten(item.children))
        }
      })

      return result
    }

    return flatten(this.getMenuItems())
  }
}

// Singleton instance
export const menuRegistry = new MenuRegistry()

// Default admin menu items
const defaultMenuItems: MenuItemConfig[] = [
  {
    id: 'home',
    title: 'Kezdőlap',
    icon: Home,
    path: '/',
    order: 1
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    order: 2
  }
]

// Register default menu items
menuRegistry.register(defaultMenuItems)

export default menuRegistry
