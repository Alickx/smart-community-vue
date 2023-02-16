<template>
  <el-skeleton :rows="5" animated :loading="loading" />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    loading: boolean;
  }>();
</script>

<style scoped></style>
