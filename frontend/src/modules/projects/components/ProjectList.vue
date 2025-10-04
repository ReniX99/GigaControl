<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import ProjectElement from './ProjectElement.vue'
  import type { IProjectInfo } from '../interfaces'
  import { getProjects } from '../api/project'

  const projects = ref<IProjectInfo[]>([])

  onMounted(async () => {
    try {
      projects.value = await getProjects()
    } catch (e) {
      if (e instanceof Error) {
        console.log(e)
      }
    }
  })
</script>

<template>
  <ProjectElement v-for="project in projects" :key="project.id" :project="project"></ProjectElement>
</template>
