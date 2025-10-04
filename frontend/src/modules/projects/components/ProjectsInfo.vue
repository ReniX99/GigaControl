<script setup lang="ts">
  import ProjectList from './ProjectList.vue'
</script>

<template>
  <div class="mt-[52px] mb-[56px] flex-1 px-[72px]">
    <div class="flex justify-between">
      <h1 class="text-[24px] font-semibold">Проекты</h1>
      <RouterLink :to="{ name: '/' }">
        <button
          class="h-full cursor-pointer rounded-[4px] bg-[#2F2E2E] px-[24px] py-[4px] text-[16px] text-white transition-colors hover:bg-[#252525]"
        >
          Добавить
        </button>
      </RouterLink>
    </div>
    <ProjectList></ProjectList>
  </div>
</template>
