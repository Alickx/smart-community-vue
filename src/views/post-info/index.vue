<template>
  <MainLayout :left-width="10" :right-width="25">
    <template #left>
      <ul class="flex flex-col space-y-5">
        <li class="mt-20">
          <PostViewHandleButtonList
            @click:comment="slideToComment"
            @update:thumb-count="updateThumbCount"
            @update:thumb-state="updateThumbState"
            @update:collect-state="updateCollectState"
            :post-data="postData"
          />
        </li>
      </ul>
    </template>
    <template #main>
      <div class="flex flex-col space-y-3 bg-white py-10 px-10">
        <skeleton :loading="loading" />
        <!-- 文章标题 -->
        <span class="text-4xl font-bold">{{ postData?.title }}</span>
        <div>
          <!-- 作者信息及关注信息 -->
          <PostViewAuthorInfo v-if="postData" :post-info="postData" />
        </div>
        <div class="min-h-100 !mt-10">
          <!-- 文章内容 -->
          <PostViewContent :content="postData?.content" />
        </div>
      </div>
      <div class="flex flex-col bg-white mt-5 py-5 px-5 space-y-5">
        <span class="font-bold text-xl">回复</span>
        <!-- 回复组件 -->
        <div class="h-45" ref="commentInputRef">
          <CommentInput
            @comment:submit="onCommentSubmit"
            :type="commentTypeEnum.COMMENT"
            :post-id="postData?.id"
            :to-user-id="postData?.authorId"
          />
        </div>
        <div>
          <!-- 评论列表 -->
          <comment-list ref="commentListRef" v-if="postData" :post-id="postData?.id" />
        </div>
      </div>
      <div>
        <!-- 相关文章推荐 -->
      </div>
    </template>
    <template #right>
      <!-- 右侧栏,作者信 -->
      <post-info-right-author-card v-if="postData?.author" :user="postData?.author" />
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
  import MainLayout from '/@/layout/main-layout/index.vue';
  import PostViewHandleButtonList from './components/post-info-handle-button-list/index.vue';
  import PostViewAuthorInfo from './components/post-info-author/index.vue';
  import PostViewContent from './components/post-info-content/index.vue';
  import CommentInput from '../../components/comment-input/index.vue';
  import CommentList from '/@/views/post-info/components/post-info-comment-list/index.vue';
  import { getPost } from '/@/api/post';
  import { CommentVO, CommentForm, PostInfoVO } from '/@/api/post/types';
  import { commentTypeEnum } from '/@/constant/comment-type-const';
  import { UserProfileVO } from '/@/api/user/types';
  import { useUserStore } from '/@/store';
  import { dateFormat } from '/@/utils/DateFormatUtil';
  import Skeleton from '/@/components/skeleton/index.vue';
  import useLoading from '/@/hooks/loading';
  import PostInfoRightAuthorCard from './components/post-info-right-author-card/index.vue';

  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();
  let commentListRef = ref();
  let postId = ref();
  let postData = ref<PostInfoVO>();
  let commentInputRef = ref();
  const { loading, toggle } = useLoading();

  /**
   * 检查文章相关信息
   */
  const checkPost = () => {
    postId.value = route.params.id;
    toggle();
    getPost(postId.value).then((resp) => {
      if (resp.code === 200) {
        toggle();
        if (resp.data === null) {
          router.push({ name: '404' });
        } else {
          postData.value = resp.data;
        }
      }
    });
  };

  const onCommentSubmit = (data: CommentForm, id: string) => {
    let commentDTO = generateComment(data, id);
    commentListRef.value.commentList.unshift(commentDTO);
  };

  /**
   * 生成评论实体
   * @param data 评论信息
   * @param id 评论id
   */
  const generateComment = (data: CommentForm, id: string) => {
    // 评论成功后本地添加评论
    let comment: CommentVO = {
      content: data.content,
      createTime: dateFormat(new Date()),
      expansion: {
        isAuthor: false,
        isComment: false,
        isThumb: false,
        isCollect: false,
        isMoreReply: false,
      },
      firstCommentId: data.firstCommentId,
      postId: data.postId,
      replyList: {
        records: [],
        total: 0,
      },
      thumbCount: 0,
      toUserId: data.toUserId,
      type: commentTypeEnum.COMMENT,
      userId: userStore.userId as unknown as string,
      userProfile: userStore.getUserProfile as unknown as UserProfileVO,
      id: id,
    };
    return comment;
  };

  const updateThumbCount = (count: number) => {
    postData.value!.thumbCount = count;
  };

  const updateThumbState = (state: boolean) => {
    postData.value!.expansion.isThumb = state;
  };

  const slideToComment = () => {
    commentInputRef.value.scrollIntoView({ behavior: 'smooth' });
  };

  const updateCollectState = (state: boolean) => {
    postData.value!.expansion.isCollect = state;
  };

  onMounted(() => {
    checkPost();
  });
</script>
