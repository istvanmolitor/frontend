import type { Component } from 'vue'

/**
 * Menu item configuration interface
 * Supports multi-level nested menu items
 */
export interface MenuItemConfig {
  /** Unique identifier for the menu item */
  id: string

  /** Display title */
  title: string

  /** Route path (optional for parent items) */
  path?: string

  /** Icon component from lucide-vue-next */
  icon?: Component

  /** Child menu items for multi-level menus */
  children?: MenuItemConfig[]

  /** Display order (lower numbers appear first) */
  order?: number

  /** Required permission to view this menu item (optional) */
  permission?: string

  /** Additional metadata */
  meta?: Record<string, any>
}

/**
 * Menu configuration for a package
 */
export interface PackageMenuConfig {
  /** Package identifier */
  packageId: string

  /** Menu items from this package */
  items: MenuItemConfig[]

  /** Package order (for organizing multiple packages) */
  order?: number
}
