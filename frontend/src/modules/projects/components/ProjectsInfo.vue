<script setup lang="ts">
  import { useUserStore } from '@/shared/stores/user-store'
  import ProjectList from './ProjectList.vue'
  import { storeToRefs } from 'pinia'

  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
</script>

<template>
  <div class="mt-[52px] mb-[56px] flex-1 px-[72px]">
    <div class="flex justify-between">
      <h1 class="text-[24px] font-semibold">Проекты</h1>
      <RouterLink :to="{ name: '/project/add-project' }">
        <button
          v-if="userInfo?.role && userInfo.role === 'Руководитель'"
          class="h-full cursor-pointer rounded-[4px] bg-[#2F2E2E] px-[24px] py-[4px] text-[16px] text-white transition-colors hover:bg-[#252525]"
        >
          Добавить
        </button>
      </RouterLink>
    </div>
    <ProjectList></ProjectList>
  </div>
</template>
