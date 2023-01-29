<template>
  <MainLayout :left-width="10" :right-width="15">
    <template #left>
      <!-- 左侧栏,点赞、关注、收藏等按钮 -->
      <div>
        <PostViewHandleButtonList />
      </div>
    </template>
    <template #main>
      <div>
        <div class="flex flex-col space-y-3 bg-white py-10 px-5">
          <skeleton :loading="loading" />
          <!-- 文章标题 -->
          <span class="text-4xl font-medium">{{ postData?.title }}</span>
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
          <div class="h-45">
            <PostViewReply
              @comment:submit="onCommentSubmit"
              :type="commentType.COMMENT"
              :post-id="postData?.id"
              :to-user-id="postData?.authorId"
            />
          </div>
          <div>
            <!-- 评论列表 -->
            <span class="font-bold text-xl">评论({{ commentListRef?.commentList.length }})</span>
            <comment-list ref="commentListRef" v-if="postData" :post-id="postData?.id" />
          </div>
        </div>
      </div>
      <div>
        <!-- 相关文章推荐 -->
      </div>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
  import MainLayout from '/@/layout/mainLayout/index.vue';
  import PostViewHandleButtonList from './components/PostViewHandleButtonList/index.vue';
  import PostViewAuthorInfo from './components/PostViewAuthorInfo/index.vue';
  import PostViewContent from './components/PostViewContent/index.vue';
  import PostViewReply from '../../components/CommentInput/index.vue';
  import CommentList from '/@/views/postView/components/PostCommentList/index.vue';
  import { getPost } from '/@/api/post';
  import { CommentDTO, PostInfoDTO } from '/@/api/post/types';
  import { commentType } from '/@/constant/CommentType';
  import { UserProfileDTO } from '/@/api/user/types';
  import { useUserStore } from '/@/store';
  import { dataFormat } from '/@/utils/DateFormatUtil';
  import Skeleton from '/@/components/Skeleton/index.vue';
  import useLoading from '/@/hooks/loading';

  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();
  let commentListRef = ref();
  let postId = ref();
  let postData = ref<PostInfoDTO>();
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

  const onCommentSubmit = (data, id) => {
    let commentDTO = generateComment(data, id);
    commentListRef.value.commentList.unshift(commentDTO);
  };

  /**
   * 生成评论实体
   * @param data 评论信息
   * @param id 评论id
   */
  const generateComment = (data, id) => {
    // 评论成功后本地添加评论
    let comment: CommentDTO = {
      content: data.content,
      createTime: dataFormat(new Date()),
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
      type: commentType.COMMENT,
      userId: userStore.userId as string,
      userProfile: userStore.getUserProfile as UserProfileDTO,
      id: id,
    };
    return comment;
  };

  onMounted(() => {
    checkPost();
  });
</script>

<style scoped lang="less"></style>
