<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '../stores/user-store'
  import { useRoute } from 'vue-router'

  const userStore = useUserStore()
  const { isAuth, userInfo } = storeToRefs(userStore)

  const route = useRoute()
</script>

<template>
  <div class="h-[88px] border-b border-b-[#D3D5DD] bg-white px-[40px]">
    <div class="flex h-full items-center justify-between">
      <h2 class="text-[22px] font-semibold tracking-[0.1em] uppercase">Giga Control</h2>
      <div v-if="route.name !== '/auth/login' && isAuth" class="flex items-center gap-[16px]">
        <p class="text-[18px]">{{ userInfo?.surname }} {{ userInfo?.name }}</p>
        <div class="rounded-[6px] border border-[#8C7F7F] px-[16px] pt-[5px] pb-[3px]">
          <p class="text-[10px]">{{ userInfo?.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
