<script setup lang="ts">
  import UserList from './UserList.vue'
</script>

<template>
  <div class="px-[16px] pb-[24px]">
    <table class="w-full">
      <thead class="border-b">
        <tr class="h-[58px]">
          <th class="w-[25%] font-semibold">Фамилия и имя</th>
          <th class="w-[25%] font-semibold">Почта</th>
          <th class="w-[30%] font-semibold">Роль</th>
          <th class="w-[20%] font-semibold"></th>
        </tr>
      </thead>
      <tbody>
        <UserList></UserList>
      </tbody>
    </table>
  </div>
</template>
