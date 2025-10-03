<script setup lang="ts">
  import CloseSvg from '@/assets/svg/CloseSvg.vue'
  import { UserForm } from '@/modules/user-form/components'
</script>

<template>
  <div
    class="absolute inset-0 flex flex-col items-center overflow-y-auto bg-[rgba(0,0,0,0.36)] py-[60px]"
  >
    <div class="relative w-[440px] rounded-[6px] bg-white px-[24px] py-[28px]">
      <h3 class="mb-[30px] text-[20px] font-semibold">Новый пользователь</h3>
      <UserForm></UserForm>
      <RouterLink :to="{ name: '/admin' }">
        <CloseSvg
          class="absolute top-[12px] right-[12px] cursor-pointer hover:scale-[105%]"
        ></CloseSvg>
      </RouterLink>
    </div>
  </div>
</template>
