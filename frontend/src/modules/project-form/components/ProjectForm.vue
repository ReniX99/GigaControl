<script setup lang="ts">
  import { ref } from 'vue'
  import type { IProjectForm } from '../interfaces'
  import { sendProjectForm } from '../api'
  import { useRouter } from 'vue-router'

  const projectForm = ref<IProjectForm>({
    title: '',
    description: '',
  })

  const router = useRouter()
  async function submitForm() {
    try {
      // const projectId = await sendProjectForm(projectForm.value)
      await sendProjectForm(projectForm.value)

      router.push('/project')
    } catch (e) {
      if (e instanceof Error) {
        console.log(e)
      }
    }
  }
</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col">
    <div class="flex flex-col gap-[20px]">
      <div class="flex flex-col gap-[12px]">
        <label for="name">Имя</label>
        <input
          v-model="projectForm.title"
          type="text"
          name="name"
          required
          class="rounded-[6px] border border-[5E5E5E] px-[10px] py-[8px] text-[16px]"
        />
      </div>
      <div class="flex flex-col gap-[12px]">
        <label for="description">Описание</label>
        <textarea
          v-model="projectForm.description"
          name="description"
          class="rounded-[6px] border border-[5E5E5E] px-[10px] py-[8px] text-[16px]"
          rows="4"
        ></textarea>
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
