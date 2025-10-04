<script setup lang="ts">
  import { ProjectsSvg } from '@/assets/svg'
  import { ProjectsInfo } from '@/modules/projects/components'
  import { Sidebar, SidebarList, SidebarElement } from '@/shared/components'
</script>

<template>
  <div class="flex flex-1">
    <Sidebar>
      <SidebarList>
        <RouterLink :to="{ name: '/' }">
          <SidebarElement name="Проекты">
            <ProjectsSvg></ProjectsSvg>
          </SidebarElement>
        </RouterLink>
      </SidebarList>
    </Sidebar>
    <ProjectsInfo></ProjectsInfo>
  </div>
</template>
