import type { MenuItemConfig, MenuBuilder } from '../types/menu'

/**
 * Menu Registry
 * Manages registration and retrieval of menu builders
 */
class MenuRegistry {
  private builders: Map<string, MenuBuilder[]> = new Map()

  /**
   * Register a menu builder
   * @param menuName - Name of the menu
   * @param builder - Menu builder instance
   */
  register(menuName: string, builder: MenuBuilder): void {
    if (!this.builders.has(menuName)) {
      this.builders.set(menuName, [])
    }
    this.builders.get(menuName)!.push(builder)
  }

  /**
   * Unregister all builders for a menu
   * @param menuName - Name of the menu to unregister
   */
  unregister(menuName: string): boolean {
    return this.builders.delete(menuName)
  }

  /**
   * Get a built menu by name
   * All registered builders for this menu will be called to build the menu
   * @param menuName - Name of the menu
   * @returns Built menu configuration or undefined if no builders registered
   */
  getMenu(menuName: string): MenuItemConfig | undefined {
    const builders = this.builders.get(menuName)
    if (!builders || builders.length === 0) {
      return undefined
    }

    // Start with empty menu structure
    let menu: MenuItemConfig = {
      id: menuName,
      title: menuName,
      children: []
    }

    // Let each builder build the menu
    builders.forEach(builder => {
      menu = builder.build(menu, menuName)
    })

    return menu
  }

  /**
   * Get all menu names
   * @returns Array of registered menu names
   */
  getMenuNames(): string[] {
    return Array.from(this.builders.keys())
  }

  /**
   * Clear all registered builders
   */
  clear(): void {
    this.builders.clear()
  }

  /**
   * Get the number of registered menus
   */
  get size(): number {
    return this.builders.size
  }
}

// Export a singleton instance
export const menuRegistry = new MenuRegistry()
