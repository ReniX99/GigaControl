<script setup lang="ts">
  import type { IProjectInfo } from '../interfaces'

  defineProps<{
    project: IProjectInfo
  }>()
</script>

<template>
  <div
    class="mt-[32px] cursor-pointer rounded-[6px] bg-white px-[20px] py-[18px] shadow-[1px_1px_4px_rgba(0,0,0,0.03)] transition-transform hover:translate-x-[6px]"
  >
    <h2 class="text-[20px]">{{ project.title }}</h2>
    <hr class="mt-[14px] mb-[26px] bg-[#888888]" />
    <div class="flex items-center gap-[16px]">
      <p>Количество дефектов:</p>
      <div class="h-[24px] rounded-[4px] border border-black px-[12px]">
        <p class="text-[16px]">{{ project.defectsCount }}</p>
      </div>
    </div>
  </div>
</template>
