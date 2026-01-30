<script setup lang="ts">
import { useMenu } from '@admin/index'
import { RouterLink } from 'vue-router'

const { menuItems, hasChildren } = useMenu('admin')
</script>

<template>
  <nav class="admin-menu">
    <ul class="menu-list">
      <li v-for="item in menuItems" :key="item.id" class="menu-item">
        <!-- Parent item with children -->
        <div v-if="hasChildren(item)" class="menu-parent">
          <div class="menu-header">
            <component v-if="item.icon" :is="item.icon" class="menu-icon" />
            <span class="menu-title">{{ item.title }}</span>
          </div>

          <ul class="submenu-list">
            <li v-for="child in item.children" :key="child.id" class="submenu-item">
              <RouterLink v-if="child.path" :to="child.path" class="menu-link">
                <component v-if="child.icon" :is="child.icon" class="menu-icon" />
                <span class="menu-title">{{ child.title }}</span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Single item without children -->
        <RouterLink v-else-if="item.path" :to="item.path" class="menu-link">
          <component v-if="item.icon" :is="item.icon" class="menu-icon" />
          <span class="menu-title">{{ item.title }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.admin-menu {
  width: 100%;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-bottom: 0.5rem;
}

.menu-parent {
  display: flex;
  flex-direction: column;
}

.menu-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #374151;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #6b7280;
  transition: all 0.2s;
  border-radius: 0.375rem;
}

.menu-link:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.menu-link.router-link-active {
  background-color: #eff6ff;
  color: #2563eb;
}

.menu-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
}

.menu-title {
  font-size: 0.875rem;
}

.submenu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  padding-left: 1rem;
}

.submenu-item {
  margin-bottom: 0.25rem;
}
</style>
