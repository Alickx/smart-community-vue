<template>
  <div class="flex w-100% h-100% bg-[#f4f5f5]">
    <div class="lg:flex display-none h-100%" :style="leftComputed">
      <slot name="left"></slot>
    </div>
    <div class="flex-1 h-100%">
      <slot name="main"></slot>
    </div>
    <div class="display-none h-100% lg:flex flex-col" :style="rightComputed">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      leftWidth: number | string;
      rightWidth: number | string;
    }>(),
    {
      leftWidth: 15,
      rightWidth: 25,
    },
  );

  const leftComputed = computed(() => {
    return {
      width: props.leftWidth + '%',
    };
  });

  const rightComputed = computed(() => {
    return {
      width: props.rightWidth + '%',
    };
  });
</script>
