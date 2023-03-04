<template>
  <v-md-editor v-model="content" />
</template>

<script setup lang="ts">
  let content = ref('');

  defineExpose({
    content,
  });
</script>

<style scoped>

.v-md-editor {
  height: 600px;
}

</style>
