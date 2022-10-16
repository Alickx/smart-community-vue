<template>
  <mainLayout>
    <template #main>
      <div class="space-y-2 bg-white p-5">
        <Post v-for="post in 15" />
      </div>
    </template>
    <template #right>
      <HotPostList />
      <HotPostList />
      <HotPostList />
    </template>
  </mainLayout>
</template>

<script setup lang="ts" name="index">
import Post from '../components/Post/index.vue';
import HotPostList from '../components/HotPostList/index.vue';
import mainLayout from '../layout/mainLayout/index.vue';



</script>

<style lang="less" scoped>

</style>
