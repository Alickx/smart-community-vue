<template>
  <v-md-editor :model-value="content" mode="preview"></v-md-editor>
</template>

<script setup lang="ts">
  defineProps<{
    content?: string;
  }>();
</script>

<style scoped></style>
