<template>
  <div class="flex flex-col h-100vh bg-[#f4f5f5]">
    <header>
      <Header />
    </header>
    <main class="flex-1 mt-20 bg-[#f4f5f5]">
      <div class="flex w-100% h-100%">
        <div class="lg:flex display-none h-100% m-x-5" :style="leftComputed">
          <slot name="left"></slot>
        </div>
        <div class="flex-1 h-100%">
          <slot name="main"></slot>
        </div>
        <div class="display-none h-100% lg:flex flex-col mx-5" :style="rightComputed">
          <slot name="right"></slot>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">

  import Header from '/@/components/header/index.vue';

  const props = withDefaults(
    defineProps<{
      leftWidth?: number | string;
      rightWidth?: number | string;
    }>(),
    {
      leftWidth: 20,
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
