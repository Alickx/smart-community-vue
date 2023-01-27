<template>
  <MainLayout :right-width="25">
    <template #main>
      <div class="bg-white p-5">
        <Post />
      </div>
    </template>
    <template #right>
      <div class="mx-3 w-70 space-y-5">
        <HotPostList />
        <HotPostList />
        <HotPostList />
      </div>
    </template>
  </MainLayout>
</template>

<script setup lang="ts" name="index">
import Post from '../components/Post/index.vue';
import HotPostList from '../components/HotPostList/index.vue';
import MainLayout from '/@/layout/mainLayout/index.vue';



</script>

<style lang="less" scoped>

</style>
