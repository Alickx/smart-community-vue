<template>
  <div class="flex w-100% h-100% bg-[#f4f5f5]">
    <div class="lg:w-20 xl:w-100 w-0 h-100% ">
      <!-- todo 用户信息 -->
    </div>
    <div class="flex-1 h-100% grid place-items-center">
      <!-- todo 文章信息 -->
      <div class="space-y-2 bg-white p-5 mt-3">
        <Article v-for="article in 15" />
      </div>
    </div>
    <div class="display-none w-100 h-100% lg:flex flex-col ml-3 mt-3 space-y-15">
      <!-- todo 右边栏 -->
      <HotArticleList />
      <HotArticleList />
      <HotArticleList />
    </div>
  </div>
</template>

<script setup lang="ts" name="index">
import Article from '../components/Article/index.vue';
import HotArticleList from '../components/HotArticleList/index.vue';



</script>

<style lang="less" scoped>

</style>
