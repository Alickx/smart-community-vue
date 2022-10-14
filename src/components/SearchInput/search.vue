<template>
  <!-- 搜索栏 -->
  <div class="xl:w-100 w-60 border-gray h-10 p-x-3 p-y-1 rounded-1 border-1 flex flex-row transition-width duration-300 ease-in-out">
    <input type="text" v-model="searchContent"
           class="border-none text-base font-medium w-[calc(100%-44px)] outline-none"
           placeholder="搜索点什么吧"/>
    <div class="cursor-pointer bg-[#f2f3f5] w-10 flex items-center justify-center">
      <svg-icon name="svg-search" size="20px"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "../SvgIcon/index.vue";

let searchContent = ref('')



</script>

<style lang="less">



</style>
