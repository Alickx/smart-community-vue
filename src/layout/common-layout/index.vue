<template>
  <div class="flex flex-col h-100vh bg-[#f4f5f5]">
    <header>
      <Header />
    </header>
    <main class="flex-1 mt-20 bg-[#f4f5f5]">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
  import Header from '/@/components/header/index.vue';
</script>

<style lang="scss" scoped></style>
