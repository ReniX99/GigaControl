<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import UserElement from './UserElement.vue'
  import type { IUser } from '../interfaces'
  import { getUsers } from '../api'

  const users = ref<IUser[]>([])
  onMounted(async () => {
    try {
      users.value = await getUsers()
    } catch (e) {
      if (e instanceof Error) {
        console.log(e)
      }
    }
  })
</script>

<template>
  <UserElement v-for="user in users" :key="user.id" :user="user"></UserElement>
</template>
