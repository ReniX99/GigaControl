<script setup lang="ts">
  import { ref, shallowRef } from 'vue'
  import type { ILoginForm } from '../interfaces'
  import { submitForm } from './api'
  import type { IError } from '@/shared/interfaces'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/shared/stores/user-store'
  import { storeToRefs } from 'pinia'

  const form = ref<ILoginForm>({
    email: '',
    password: '',
  })

  const error = shallowRef<IError>({
    status: false,
    message: '',
  })

  const router = useRouter()
  const handleForm = async () => {
    try {
      await submitForm(form.value)

      const userStore = useUserStore()
      const { userInfo } = storeToRefs(userStore)

      if (userInfo.value?.role === 'Админ') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } catch (e) {
      if (e instanceof Error) {
        error.value = {
          status: true,
          message: e.message,
        }
      }
    }
  }
</script>

<template>
  <section
    class="mt-[40px] w-[384px] rounded-[8px] bg-white px-[32px] py-[26px] pb-[40px] shadow-[1px_2px_11px_rgba(0,0,0,0.03)]"
  >
    <h2 class="mb-[36px] text-center text-[21px]">Вход</h2>
    <form @submit.prevent="handleForm" class="flex flex-col">
      <div class="flex flex-col gap-[32px]">
        <div class="flex flex-col gap-[12px]">
          <label forn="email">Почта</label>
          <input
            v-model="form.email"
            name="email"
            type="email"
            required
            class="rounded-[6px] border border-[#5E5E5E] px-[8px] py-[7px] text-[16px] font-medium"
          />
        </div>
        <div class="flex flex-col gap-[12px]">
          <label for="password">Пароль</label>
          <input
            v-model="form.password"
            name="password"
            type="password"
            minlength="8"
            required
            class="rounded-[6px] border border-[#5E5E5E] px-[8px] py-[7px] text-[16px] font-medium"
          />
        </div>
      </div>
      <p v-if="error.status" class="text-red mt-[16px] font-semibold">Неверная почта или пароль</p>
      <button
        type="submit"
        :class="[error.status ? 'mt-[40px]' : 'mt-[56px]']"
        class="w-[200px] cursor-pointer self-center rounded-[6px] bg-black py-[11px] transition-colors hover:bg-[#0e0e0d]"
      >
        <p class="text-center text-[16px] text-white">Войти</p>
      </button>
    </form>
  </section>
</template>
