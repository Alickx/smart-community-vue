<template>
  <div class="bg-white p-x-3">
    <el-tabs v-model="activeValue" @tab-click="onClickTab">
      <el-tab-pane v-for="item in tabs" :key="item.value" :label="item.label" :name="item.value">
        <div v-if="postList.length !== 0">
          <Post @update:post-list="onUpdateThumbPostList" v-for="post in postList" :key="post.id" :post="post" />
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
    userId: route.params.id,
    sort: 'createTime,desc',
  });

  const getPosts = async () => {
    const { data } = await pageGetPost(params);
    postList.value = data.records;
  };

  const getPostsByComment = async () => {
    const { data } = await queryByComment(params);
    postList.value = data.records;
  };

  const onUpdateThumbPostList = (id: string, type: boolean) => {
    postList.value = postList.value.map((item) => {
      if (item.id === id) {
        item.expansion.isThumb = type;
        item.thumbCount = type ? item.thumbCount + 1 : item.thumbCount - 1;
      }
      return item;
    });
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
