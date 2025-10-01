<script setup lang="ts">
  import { Header } from './shared/components'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header></Header>
    <div class="flex flex-1 bg-[#F4F5FA]">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
  body {
    font-family: 'Montserrat', 'sans-serif';
    font-weight: 500;
    font-size: 14px;
    color: '#161515';
  }
</style>
