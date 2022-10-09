<template>
  <div class="flex w-100% h-100%">
    <div class="lg:w-50 h-100% ">
      <!-- todo 用户信息 -->
    </div>
    <div class="flex-1 h-100% grid place-items-center">
      <!-- todo 文章信息 -->
      <div class="w-100% space-y-2">
        <Article v-for="article in 5" />
      </div>
    </div>
    <div class="lg:w-90 h-100%">
      <!-- todo 最新文章 -->
    </div>
  </div>
</template>

<script setup lang="ts" name="index">
import Article from '../components/Article/index.vue';



</script>

<style lang="less" scoped>

</style>
