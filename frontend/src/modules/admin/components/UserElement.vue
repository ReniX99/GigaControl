<script setup lang="ts">
  import type { IUser } from '../interfaces'

  defineProps<{ user: IUser }>()
</script>

<template>
  <tr class="h-[64px] border-b">
    <td class="pl-[20px] text-[17px]">{{ user.surname }} {{ user.name }}</td>
    <td class="text-center">{{ user.email }}</td>
    <td class="text-center">{{ user.role ?? 'Нет роли' }}</td>
    <td class="text-right">
      <button
        class="cursor-pointer rounded-[6px] bg-[#FFA81C] px-[10px] py-[8px] text-white hover:bg-[#ffa008]"
      >
        Редактировать
      </button>
    </td>
  </tr>
</template>

<style scoped>
  td:nth-child(1) {
    width: 25%;
  }
  td:nth-child(2) {
    width: 25%;
  }
  td:nth-child(3) {
    width: 30%;
  }
  td:nth-child(4) {
    width: 20%;
  }
</style>
