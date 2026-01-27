import { inject, type ComputedRef, type Ref } from 'vue'

export interface SidebarContext {
  state: ComputedRef<'expanded' | 'collapsed'>
  open: Ref<boolean>
  setOpen: (value: boolean) => void
  openMobile: Ref<boolean>
  setOpenMobile: (value: boolean) => void
  isMobile: ComputedRef<boolean>
  toggleSidebar: () => void
}

export function useSidebar() {
  const context = inject<SidebarContext>('sidebar-context')
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
