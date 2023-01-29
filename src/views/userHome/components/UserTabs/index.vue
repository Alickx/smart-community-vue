<template>
  <div class="bg-white p-4">
    <el-tabs v-model="activeValue" @tab-click="onClickTab">
      <el-tab-pane v-for="item in tabs" :key="item.value" :label="item.label" :name="item.value">
        <div v-if="postList.length !== 0">
          <Post v-for="post in postList" :key="post.id" :post="post" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  import Post from '/@/components/Post/index.vue';
  import { PostAbbreviationDTO } from '/@/api/post/types';
  import { pageGetPost, queryByComment } from '/@/api/post';
  import { TabsPaneContext } from 'element-plus';

  const route = useRoute();
  const tabs = [
    {
      label: '文章',
      value: 'posts',
    },
    {
      label: '回复',
      value: 'comments',
    },
  ];

  let activeValue = ref('posts');
  let postList = ref<PostAbbreviationDTO[]>([]);

  let params = reactive({
    page: 1,
    size: 5,
    authorId: route.params.id,
  });

  const getPosts = async () => {
    const { data } = await pageGetPost(params);
    postList.value = data.records;
  };

  const getPostsByComment = async () => {
    const { data } = await queryByComment(params);
    postList.value = data.records;
  };

  const onClickTab = (tab: TabsPaneContext) => {
    switch (tab.paneName) {
      case 'posts':
        getPosts();
        break;
      case 'comments':
        getPostsByComment();
        break;
    }
  };

  onMounted(getPosts);
</script>

<style scoped></style>
