<script setup lang="ts">
  import { getRoles } from '@/shared/api'
  import type { IRole } from '@/shared/interfaces/role'
  import { onMounted, ref } from 'vue'
  import type { IUserForm } from '../interfaces'
  import { sendUserInfo } from '../api'
  import { useRouter } from 'vue-router'

  const roles = ref<IRole[]>([])
  onMounted(async () => {
    try {
      roles.value = await getRoles()
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  })

  const userForm = ref<IUserForm>({
    email: '',
    surname: '',
    name: '',
    password: '',
    repeatedPassword: '',
    roleId: roles.value[0]?.id ?? 2,
  })

  const router = useRouter()
  async function submitForm() {
    try {
      await sendUserInfo(userForm.value)

      router.push({ name: '/admin' })
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }
</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col">
    <div class="flex flex-col gap-[18px]">
      <div class="flex flex-col gap-[12px]">
        <label for="email">Почта</label>
        <input
          v-model="userForm.email"
          type="email"
          name="email"
          required
          class="rounded-[6px] border border-[5E5E5E] px-[10px] py-[8px] text-[16px]"
        />
      </div>
      <div class="flex flex-col gap-[12px]">
        <label for="surname">Фамилия</label>
        <input
          v-model="userForm.surname"
          type="text"
          name="surname"
          required
          class="rounded-[6px] border border-[5E5E5E] px-[10px] py-[8px] text-[16px]"
        />
      </div>
      <div class="flex flex-col gap-[12px]">
        <label for="name">Имя</label>
        <input
          v-model="userForm.name"
          type="text"
          name="name"
          required
          class="rounded-[6px] border border-[5E5E5E] px-[10px] py-[8px] text-[16px]"
        />
      </div>
      <div class="flex flex-col gap-[12px]">
        <label for="role">Роль</label>
        <select
          v-model="userForm.roleId"
          name="role"
          required
          class="rounded-[6px] border border-[5E5E5E] px-[10px] py-[8px] text-[16px]"
        >
          <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
        </select>
      </div>
      <div class="flex flex-col gap-[12px]">
        <label for="password">Пароль</label>
        <input
          v-model="userForm.password"
          type="password"
          name="password"
          required
          class="rounded-[6px] border border-[5E5E5E] px-[10px] py-[8px] text-[16px]"
        />
      </div>
      <div class="flex flex-col gap-[12px]">
        <label for="repeated-password">Повторить пароль</label>
        <input
          v-model="userForm.repeatedPassword"
          type="password"
          name="repeated-password"
          required
          class="rounded-[6px] border border-[5E5E5E] px-[10px] py-[8px] text-[16px]"
        />
      </div>
    </div>
    <button
      type="submit"
      class="mt-[32px] cursor-pointer self-center rounded-[4px] bg-[#2F2E2E] px-[56px] py-[10px] text-[16px] text-white transition-colors hover:bg-[#252525]"
    >
      Создать
    </button>
  </form>
</template>
