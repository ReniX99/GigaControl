<script setup lang="ts">
  import CloseSvg from '@/assets/svg/CloseSvg.vue'
  import { ProjectForm } from '@/modules/project-form/components'
  import { RouterLink } from 'vue-router'
</script>

<template>
  <div
    class="absolute inset-0 flex items-start justify-center overflow-y-auto bg-[rgba(0,0,0,0.36)] py-[60px]"
  >
    <div class="relative w-[440px] rounded-[6px] bg-white px-[24px] py-[30px]">
      <h3 class="mb-[26px] text-[20px] font-semibold">Новый проект</h3>
      <ProjectForm></ProjectForm>
      <RouterLink :to="{ name: '/project' }">
        <CloseSvg
          class="absolute top-[12px] right-[12px] cursor-pointer transition-transform hover:scale-[105%]"
        ></CloseSvg>
      </RouterLink>
    </div>
  </div>
</template>
