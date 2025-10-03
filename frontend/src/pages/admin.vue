<script setup lang="ts">
  import { Sidebar, SidebarElement } from '@/shared/components'
  import { UsersSvg } from '@/assets/svg'
  import SidebarList from '@/shared/components/SidebarList.vue'
  import { AdminPanel } from '@/modules/admin/components'
</script>

<template>
  <div class="flex flex-1">
    <Sidebar>
      <SidebarList>
        <RouterLink :to="{ name: '/admin' }">
          <SidebarElement name="Пользователи">
            <UsersSvg></UsersSvg>
          </SidebarElement>
        </RouterLink>
      </SidebarList>
    </Sidebar>
    <AdminPanel></AdminPanel>
  </div>
  <RouterView></RouterView>
</template>
