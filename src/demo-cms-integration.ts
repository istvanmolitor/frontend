/**
 * Demo: CMS Package Integration Test
 *
 * Ez a fájl demonstrálja a vue-cms package használatát a frontend projektben.
 * A fájl importálható a main.ts-be a funkciók teszteléséhez.
 */

import { cmsMenuBuilder } from '@cms/index'
import { menuRegistry } from '@menu/index'
import { Settings, FileCode, Palette } from 'lucide-vue-next'

/**
 * Demo: Regisztrált menüelemek ellenőrzése
 */
export function testMenuRegistration() {
  console.log('=== CMS Menu Registration Test ===')

  // 1. Egyedi menüelem hozzáadása
  console.log('1. Adding custom menu item...')
  cmsMenuBuilder.registerMenuItem('admin', {
    id: 'cms-settings',
    title: 'Beállítások',
    path: '/cms/settings',
    icon: Settings,
    order: 90
  })

  // 2. Több elem hozzáadása
  console.log('2. Adding multiple menu items...')
  cmsMenuBuilder.registerMenuItems('admin', [
    {
      id: 'cms-themes',
      title: 'Témák',
      path: '/cms/themes',
      icon: Palette,
      order: 80
    },
    {
      id: 'cms-snippets',
      title: 'Kódrészletek',
      path: '/cms/snippets',
      icon: FileCode,
      order: 85
    }
  ])

  // 3. Regisztrált elemek lekérdezése
  const registeredItems = cmsMenuBuilder.getRegisteredMenuItems('admin')
  console.log('3. Registered items:', registeredItems)

  // 4. Teljes menü lekérése
  const adminMenu = menuRegistry.getMenu('admin')
  console.log('4. Full admin menu:', adminMenu)

  // 5. CMS menü keresése
  const cmsSection = adminMenu.children?.find(item => item.id === 'cms-management')
  console.log('5. CMS section:', cmsSection)
  console.log('   CMS children:', cmsSection?.children)

  console.log('=== Test Complete ===')

  return {
    registeredItems,
    adminMenu,
    cmsSection
  }
}

/**
 * Demo: Menü tisztítás
 */
export function testMenuClear() {
  console.log('=== CMS Menu Clear Test ===')

  const beforeClear = cmsMenuBuilder.getRegisteredMenuItems('admin')
  console.log('Before clear:', beforeClear.length, 'items')

  cmsMenuBuilder.clearRegisteredMenuItems('admin')

  const afterClear = cmsMenuBuilder.getRegisteredMenuItems('admin')
  console.log('After clear:', afterClear.length, 'items')

  console.log('=== Clear Test Complete ===')
}

/**
 * Használat a main.ts-ben:
 *
 * import { testMenuRegistration } from './demo-cms-integration'
 *
 * // ... app setup ...
 *
 * // Development módban tesztelés
 * if (import.meta.env.DEV) {
 *   testMenuRegistration()
 * }
 */

export default {
  testMenuRegistration,
  testMenuClear
}

