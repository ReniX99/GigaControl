<script setup lang="ts">
  defineProps<{
    name: string
  }>()
</script>

<template>
  <li
    class="top-[10px] flex cursor-pointer items-center gap-[22px] transition-transform hover:translate-x-[4px]"
  >
    <slot></slot>
    <p class="text-[17px]">
      {{ name }}
    </p>
  </li>
</template>
