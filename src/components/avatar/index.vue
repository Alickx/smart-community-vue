<template>
  <div :style="style" class="avatar cursor-pointer overflow-hidden p-1">
    <img :src="props.src" class="w-full h-full object-cover rounded-full border-1 border-[#f4f5f5]" alt="" />
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      src: string;
      size?: number | string;
    }>(),
    {
      src: '',
      size: 4,
    },
  );

  const style = computed(() => {
    return {
      width: `${props.size}rem`,
      height: `${props.size}rem`,
    };
  });
</script>

<style scoped></style>
