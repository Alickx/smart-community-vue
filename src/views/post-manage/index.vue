<template>
  <main-layout>
    <template #main>
      <h1 class="text-center m-y-5">文章管理</h1>
      <ul class="bg-white rounded">
        <li v-for="post in postList" :key="post.id" class="cursor-pointer hover:bg-[#fafafa] border-b-1 border-b-[#e5e6eb] p-3">
          <post-manage-item :post="post" @delete:post="deletePost" />
        </li>
      </ul>
    </template>
  </main-layout>
</template>

<script setup lang="ts">
  import mainLayout from '/@/layout/main-layout/index.vue';
  import { useUserStore } from '/@/store';
  import { pagePost } from '/@/api/post';
  import { PostAbbreviationDTO } from '/@/api/post/types';
  import useLoading from '/@/hooks/loading';
  import postManageItem from './post-manage-item/index.vue';

  const userStore = useUserStore();
  const { loading, toggle, setLoading } = useLoading();

  let pageParam = reactive({
    page: 1,
    size: 10,
    userId: userStore.userId,
    sort: 'createTime,desc',
  });
  let total = ref(0);

  const postList = ref<PostAbbreviationDTO[]>([]);

  const getPostList = async () => {
    if (pageParam.page === 1) {
      toggle();
    }
    const { code, data } = await pagePost(pageParam);
    if (code === 200) {
      if (loading.value) {
        setLoading(false);
      }
      total.value = data.total;
      postList.value = data.records;
    }
  };

  const deletePost = (id: string) => {
    postList.value = postList.value.filter((item) => item.id !== id);
  };

  onMounted(() => {
    getPostList();
  });
</script>
