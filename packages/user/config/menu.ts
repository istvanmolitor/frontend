import { Users, UserCircle, Shield, FolderTree } from 'lucide-vue-next'
import type { MenuItemConfig } from '@admin/types/menu'

/**
 * User package menu configuration
 * Defines the menu structure for user management features
 */
export const userMenuConfig: MenuItemConfig = {
  id: 'user-menu',
  title: 'Felhasználók',
  icon: Users,
  order: 100,
  children: [
    {
      id: 'profile',
      title: 'Profilom',
      icon: UserCircle,
      path: '/profile',
      order: 10
    },
    {
      id: 'user-management',
      title: 'Felhasználók',
      icon: FolderTree,
      order: 20,
      children: [
        {
          id: 'users-list',
          title: 'Felhasználók',
          path: '/users',
          order: 10
        },
        {
          id: 'user-groups',
          title: 'Csoportok',
          path: '/user-groups',
          order: 20
        },
        {
          id: 'permissions',
          title: 'Jogosultságok',
          path: '/permissions',
          order: 30
        }
      ]
    }
  ]
}

export default userMenuConfig
