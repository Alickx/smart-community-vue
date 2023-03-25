<template>
  <ul class="bg-white rounded">
    <li class="p-3" v-if="loading">
      <el-skeleton :loading="loading" :rows="5" animated />
    </li>
    <li
      v-else-if="postList.length && !loading"
      v-for="post in postList"
      :key="post.id"
      class="cursor-pointer hover:bg-[#fafafa] border-b-1 border-b-[#e5e6eb] p-3"
    >
      <post-manage-item :post="post" @delete:post="deletePost" />
    </li>
    <el-empty v-else :image="searchSvg" :image-size="300" description="暂无文章" />
  </ul>
</template>

<script setup lang="ts">
  import { useUserStore } from '/@/store';
  import { pagePost } from '/@/api/post';
  import useLoading from '/@/hooks/loading';
  import searchSvg from '/@/assets/icons/svg/search-empty.svg';
  import { PostAbbreviationVO } from '/@/api/post/types';
  import PostManageItem from './components/post-manage-item/index.vue';

  const userStore = useUserStore();
  const { loading, toggle, setLoading } = useLoading();

  let pageParam = reactive({
    page: 1,
    size: 10,
    userId: userStore.userId,
    sort: 'createTime,desc',
  });
  let total = ref(0);

  const postList = ref<PostAbbreviationVO[]>([]);

  const getPostList = async () => {
    if (pageParam.page === 1) {
      toggle();
    }
    const { code, data } = await pagePost(pageParam);
    if (code === 200) {
      if (loading.value) {
        setLoading(false);
      }
      total.value = data!.total;
      postList.value = data!.records;
    }
  };

  const deletePost = (id: string) => {
    postList.value = postList.value.filter((item) => item.id !== id);
  };

  onMounted(() => {
    getPostList();
  });
</script>
