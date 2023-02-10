<template>
  <MainLayout :right-width="35" :left-width="25">
    <template #left>
      <div class="w-full mx-3 flex justify-center">
        <LeftPanel />
      </div>
    </template>
    <template #main>
      <div class="bg-white">
        <div class="p-3" v-if="loading">
          <el-skeleton :loading="loading" :rows="10" animated />
        </div>
        <Post v-for="post in postList" :post="post" :key="post.id" @update:post-list="onUpdateThumbPostList" />
      </div>
    </template>
    <template #right>
      <div class="mx-3 w-60 space-y-5">
        <HotPostList />
      </div>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
  import Post from '/@/components/Post/index.vue';
  import HotPostList from '/@/components/HotPostList/index.vue';
  import MainLayout from '/@/layout/mainLayout/index.vue';
  import { pageGetPost } from '/@/api/post';
  import { useDebounceFn } from '@vueuse/core';
  import { PageParam } from '/@/types/req';
  import { PostAbbreviationDTO } from '/@/api/post/types';
  import LeftPanel from '/@/views/homePage/components/LeftPanel/index.vue';
  import useLoading from '/@/hooks/loading';

  const { loading, toggle } = useLoading();

  const params = reactive<PageParam>({
    page: 1,
    size: 20,
    sort: 'createTime,desc',
  });

  let postList = ref<PostAbbreviationDTO[]>([]);
  let postTotal = ref();

  const getPosts = () => {
    if (params.page === 1) {
      toggle();
    }
    pageGetPost(params).then((resp) => {
      if (loading) {
        toggle();
      }
      postList.value.push(...resp.data.records);
      postTotal.value = resp.data.total;
    });
  };

  const scrollLoad = useDebounceFn(() => {
    // 滑动到底部加载更多
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + clientHeight > scrollHeight - 50) {
      if (postList.value.length < postTotal.value) {
        params.page = params.page + 1;
        getPosts();
      }
    }
  }, 500);

  const onUpdateThumbPostList = (id: string, type: boolean) => {
    postList.value = postList.value.map((item) => {
      if (item.id === id) {
        item.expansion.isThumb = type;
        item.thumbCount = type ? item.thumbCount + 1 : item.thumbCount - 1;
      }
      return item;
    });
  };

  onMounted(() => {
    getPosts();
    window.addEventListener('scroll', scrollLoad);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollLoad);
  });
</script>

<style lang="less" scoped></style>
