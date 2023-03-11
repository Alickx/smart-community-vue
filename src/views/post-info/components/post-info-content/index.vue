<template>
  <v-md-editor :model-value="content" mode="preview" />
</template>

<script setup lang="ts">
  defineProps<{
    content?: string;
  }>();
</script>

<style scoped>
  ::v-deep(.vuepress-markdown-body) {
    padding: 0;
  }
</style>
