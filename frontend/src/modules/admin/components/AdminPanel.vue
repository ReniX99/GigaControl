<script setup lang="ts">
  import UserTable from './UserTable.vue'
</script>

<template>
  <div class="mt-[52px] flex-1 px-[72px]">
    <div class="flex justify-between">
      <h1 class="text-[24px] font-semibold">Пользователи</h1>
      <RouterLink :to="{ name: '/admin/add-user' }">
        <button
          class="h-full cursor-pointer rounded-[4px] bg-[#2F2E2E] px-[24px] py-[4px] text-[16px] text-white transition-colors hover:bg-[#252525]"
        >
          Добавить
        </button>
      </RouterLink>
    </div>
    <div class="mt-[32px] rounded-[6px] bg-white">
      <UserTable></UserTable>
    </div>
  </div>
</template>
