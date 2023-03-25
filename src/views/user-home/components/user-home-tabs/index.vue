<template>
  <div class="bg-white p-x-3">
    <el-tabs v-model="activeValue" @tab-click="onClickTab">
      <el-tab-pane v-for="item in tabs" :key="item.value" :label="item.label" :name="item.value">
        <ul v-if="postList.length !== 0 && showPostComputed && !loading">
          <li v-for="post in postList" :key="post.id">
            <Post @update:post-list="onUpdateThumbPostList" :post="post" />
          </li>
        </ul>
        <ul v-else-if="(activeValue === 'fans' || activeValue === 'follows') && !loading">
          <li class="border-1 border-[#e6e6e7] space-y-3" v-for="followVO in followList" :key="followVO.userProfile.userId">
            <user-follow-card :userFollowVO="followVO" />
          </li>
        </ul>
        <el-skeleton v-else-if="loading" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
  import Post from '/@/components/post/index.vue';
  import { PostAbbreviationVO } from '/@/api/post/types';
  import { pagePost, queryByComment } from '/@/api/post';
  import { TabsPaneContext } from 'element-plus';
  import { queryFollowUser, queryPageCollect, queryUserFans } from '/@/api/user';
  import { UserFollowVO } from '/@/api/user/types';
  import userFollowCard from '/@/components/user-follow-card/index.vue';
  import useLoading from '/@/hooks/loading';

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
    {
      label: '关注',
      value: 'follows',
    },
    {
      label: '粉丝',
      value: 'fans',
    },
    {
      label: '收藏',
      value: 'collects',
    },
  ];

  let activeValue = ref('posts');
  let postList = ref<PostAbbreviationVO[]>([]);
  let followList = ref<UserFollowVO[]>();
  const { loading, setLoading } = useLoading();

  let params = reactive({
    page: 1,
    size: 5,
    userId: route.params.id,
    sort: 'createTime,desc',
  });

  const showPostComputed = computed(() => {
    return (
      postList.value.length !== 0 && (activeValue.value === 'posts' || activeValue.value === 'comments' || activeValue.value === 'collects')
    );
  });

  const getPosts = async () => {
    resetParams();
    loading.value = true;
    const { data } = await pagePost(params);
    postList.value = data!.records;
    setLoading(false);
  };

  const getPostsByComment = async () => {
    resetParams();
    loading.value = true;
    const { data } = await queryByComment(params);
    postList.value = data!.records;
    setLoading(false);
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

  const getFans = async () => {
    resetParams();
    setLoading(true);
    const { data } = await queryUserFans(params);
    followList.value = data!.records;
    setLoading(false);
  };

  const queryPageFollows = async () => {
    resetParams();
    setLoading(true);
    const { data } = await queryFollowUser(params);
    followList.value = data!.records;
    setLoading(false);
  };

  const getCollects = async () => {
    resetParams();
    setLoading(true);
    const { data } = await queryPageCollect(params);
    postList.value = data!.records;
    setLoading(false);
  };

  const resetParams = () => {
    params.page = 1;
    params.size = 5;
    params.userId = route.params.id;
    params.sort = 'createTime,desc';
  };

  const onClickTab = (tab: TabsPaneContext) => {
    switch (tab.paneName) {
      case 'posts':
        getPosts();
        break;
      case 'comments':
        getPostsByComment();
        break;
      case 'fans':
        getFans();
        break;
      case 'collects':
        getCollects();
        break;
      case 'follows':
        queryPageFollows();
        break;
    }
  };

  onMounted(getPosts);
</script>

<style scoped></style>
