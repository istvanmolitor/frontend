/**
 * Menu System Test
 * Validates the menu registry and menu items structure
 */

import { menuRegistry } from '@admin/config/menuRegistry'
import { initializeMenu } from '@admin/config/menuInitializer'

console.log('=== Menu System Test ===\n')

// Clear any existing items
menuRegistry.clear()

// Initialize menu
console.log('1. Initializing menu...')
initializeMenu()

// Get menu items
const menuItems = menuRegistry.getMenuItems()
console.log('2. Total top-level menu items:', menuItems.length)

// Display menu structure
console.log('\n3. Menu Structure:')
function printMenu(items: any[], level = 0) {
  const indent = '  '.repeat(level)
  items.forEach(item => {
    const icon = item.icon ? '🎨' : '  '
    const path = item.path ? `(${item.path})` : ''
    console.log(`${indent}${icon} ${item.title} ${path} [order: ${item.order || 'none'}]`)

    if (item.children && item.children.length > 0) {
      printMenu(item.children, level + 1)
    }
  })
}

printMenu(menuItems)

// Get flattened items
const flatItems = menuRegistry.getFlattenedItems()
console.log('\n4. Total menu items (including nested):', flatItems.length)

// Verify order
console.log('\n5. Order verification:')
const orders = menuItems.map(item => ({ title: item.title, order: item.order || 999 }))
console.log('Top-level orders:', orders)

const isOrdered = orders.every((item, idx) => {
  if (idx === 0) return true
  return orders[idx - 1].order <= item.order
})
console.log('Is properly ordered:', isOrdered ? '✅ Yes' : '❌ No')

console.log('\n=== Test Complete ===')
