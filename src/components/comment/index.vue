<template>
  <div class="flex flex-row" :class="{ removing: isRemoving }" ref="commentRef">
    <div class="mr-5">
      <!--   头像,发布时间-->
      <router-link :to="{ name: 'user-home', params: { id: commentProps.userId } }" custom v-slot="{ href }">
        <a :href="href" target="_blank">
          <Avatar v-if="type === commentTypeEnum.COMMENT" :src="commentProps.userProfile.avatar" :size="40" />
          <Avatar v-else :src="commentProps.userProfile.avatar" :size="40" />
        </a>
      </router-link>
    </div>
    <div class="flex flex-col flex-1">
      <!-- 一级评论主体-->
      <div class="flex flex-col space-y-5">
        <!-- 作者名 -->
        <div class="flex flex-row items-center space-x-5">
          <div class="flex items-center space-x-2">
            <span class="cursor-pointer font-bold text-[18px] color-[000000]">{{ commentProps.userProfile.nickName }}</span>
          </div>
          <!-- 评论时间 -->
          <span class="color-gray-400 text-md font-normal">{{ dateFormatDay(commentProps.createTime) }}</span>
        </div>
        <!--   评论内容-->
        <p>
          {{ commentProps.content }}
        </p>
        <!-- 评论操作 -->
        <div class="flex flex-col space-y-5" ref="commentInputRef">
          <!-- 回复和点赞按钮 -->
          <div class="flex flex-row flex-nowrap space-x-5 items-center w-90%">
            <div
              @click.stop="thumbHandle(commentProps.id, commentProps.expansion.isThumb)"
              class="flex flex-row flex-nowrap items-center space-x-1 cursor-pointer hover:color-[blue]"
            >
              <SvgIcon name="svg-thumb" :color="commentProps.expansion.isThumb ? 'blue' : 'black'" size="20px" />
              <span>{{ commentProps.thumbCount === 0 ? '点赞' : commentProps.thumbCount }}</span>
            </div>
            <div
              @click="showReplyInput(commentProps.id)"
              class="flex flex-row flex-nowrap items-center space-x-1 cursor-pointer hover:color-[blue]"
            >
              <SvgIcon name="svg-comment" :color="commentProps.expansion.isComment ? 'blue' : 'black'" size="20px" />
              {{ showReplyInputId === commentProps.id ? '收起' : '回复' }}
            </div>
            <div class="flex flex-1 justify-end" v-if="isReplySelf">
              <el-popconfirm
                title="是否删除该评论"
                confirm-button-text="确定"
                cancel-button-text="取消"
                @confirm="onDeleteComment(commentProps.id)"
                @cancel="onCancelPopConfirm"
              >
                <template #reference>
                  <span class="cursor-pointer color-red">删除</span>
                </template>
              </el-popconfirm>
            </div>
          </div>
          <!-- 回复组件 -->
          <div class="h-45 w-full" v-if="showReplyInputId === commentProps.id">
            <CommentInput
              @comment:submit="onCommentSubmit"
              @reply:submit="onReplyInputSubmit"
              :type="commentTypeEnum.REPLY"
              :first-comment-id="type === commentTypeEnum.COMMENT ? commentProps.id : commentProps.firstCommentId"
              :post-id="postId"
              :to-user-id="commentProps.userId"
            />
          </div>
        </div>
      </div>
      <!-- 二级评论 -->
      <div v-if="type === commentTypeEnum.COMMENT && replyList?.length > 0" class="p-5 bg-[#f9fafb] rounded-lg mt-5 space-y-6">
        <Reply
          class="list-item"
          @delete:comment="onLocalDeleteComment"
          @reply:submit="onReplySubmit"
          v-for="reply in replyList"
          :key="reply.id"
          :thumb-type="thumbTypeEnum.REPLY"
          :type="commentTypeEnum.REPLY"
          :post-id="postId"
          :comment="reply"
        />
        <div class="cursor-pointer !mt-12 ml-15 flex items-center" @click="onQueryMoreReply(commentProps.id)" v-if="isShowMoreReply">
          <span
            >查看更多回复
            <svg-icon name="svg-down" size="20px" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onClickOutside, useDebounceFn } from '@vueuse/core';
  import { cancelThumb, deleteComment, queryMoreReply, saveThumb } from '/@/api/post';
  import { CommentVO } from '/@/api/post/types';
  import Avatar from '/@/components/avatar/index.vue';
  import { thumbTypeEnum } from '/@/constant/thumb-type-const';
  import SvgIcon from '/@/components/svg-icon/index.vue';
  import { commentTypeEnum } from '/@/constant/comment-type-const';
  import CommentInput from '/@/components/comment-input/index.vue';
  import Reply from '/@/components/comment/index.vue';
  import { PropType } from 'vue';
  import { useUserStore } from '/@/store';
  import { UserProfileVO } from '/@/api/user/types';
  import { dateFormat, dateFormatDay } from '/@/utils/DateFormatUtil';

  const props = defineProps({
    comment: {
      type: Object as PropType<CommentVO>,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    type: {
      type: Number as PropType<commentTypeEnum>,
      required: true,
    },
    thumbType: {
      type: Number as PropType<thumbTypeEnum>,
      required: true,
    },
  });

  const emit = defineEmits(['delete:comment', 'reply:submit']);

  const userStore = useUserStore();
  const router = useRouter();
  let replyList = ref(props.comment?.replyList?.records);
  let commentInputRef = ref();
  let commentRef = ref();
  let showReplyInputId = ref<String>('');
  let isShowPopconfirm = ref(false);
  let isRemoving = ref(false);
  const commentProps = ref<CommentVO>(props.comment);
  let isShowMoreReply = ref(commentProps.value.expansion.isMoreReply);

  onClickOutside(commentInputRef, () => {
    showReplyInputId.value = '';
  });

  const onQueryMoreReply = (commentId: string) => {
    queryMoreReply(props.postId, commentTypeEnum.REPLY, commentId).then((resp) => {
      if (resp.code === 200 && resp.data) {
        replyList.value = resp.data;
        isShowMoreReply.value = false;
      }
    });
  };

  const onCommentSubmit = (data, id) => {
    let commentDTO = generateComment(data, id);
    if (!Array.isArray(replyList.value)) {
      replyList.value = [];
    }
    showReplyInputId.value = '';
    replyList.value.unshift(commentDTO);
  };

  /**
   * 一级评论收到二级评论的回复事件，本地新增评论
   * @param commentDTO
   */
  const onReplySubmit = (commentDTO: CommentVO) => {
    if (!Array.isArray(replyList.value)) {
      replyList.value = [];
    }
    replyList.value.unshift(commentDTO);
  };

  /**
   * 二级评论需要触发事件让一级评论那里本地新增评论
   * @param data
   * @param id
   */
  const onReplyInputSubmit = (data, id) => {
    let commentDTO = generateComment(data, id);
    if (props.type === commentTypeEnum.COMMENT) {
      if (!Array.isArray(replyList.value)) {
        replyList.value = [];
      }
      replyList.value.unshift(commentDTO);
    } else {
      emit('reply:submit', commentDTO);
    }
  };

  /**
   * 生成评论实体
   * @param data 评论信息
   * @param id 评论id
   */
  const generateComment = (data, id) => {
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

  /**
   * thumbState false 未点赞 true 已点赞
   *
   */
  const debounceThumbHandle = useDebounceFn((id: string, thumbState: boolean) => {
    if (!thumbState) {
      saveThumb(id, props.thumbType).then((resp) => {
        if (resp.code === 200) {
          commentProps.value.thumbCount = props.comment.thumbCount + 1;
          commentProps.value.expansion.isThumb = true;
        }
      });
    } else {
      cancelThumb(id, props.thumbType).then((resp) => {
        if (resp.code === 200) {
          commentProps.value.thumbCount = props.comment.thumbCount - 1;
          commentProps.value.expansion.isThumb = false;
        }
      });
    }
  }, 100);

  /**
   * 点赞操作
   * @param id 目标id
   * @param thumbState 点赞状态
   */
  const thumbHandle = (id: string, thumbState: boolean) => {
    if (!userStore.getIsLogin) {
      router.push({
        name: 'login',
      });
      return;
    }
    // 请求
    debounceThumbHandle(id, thumbState);
  };

  /**
   * 显示回复输入框
   * @param id 目标id
   */
  const showReplyInput = (id: string) => {
    // 判断当前是否已经登录
    if (!userStore.getIsLogin) {
      router.push({
        name: 'Login',
      });
      return;
    }
    if (showReplyInputId.value !== id) {
      showReplyInputId.value = id;
    } else {
      showReplyInputId.value = '';
    }
  };

  /**
   * 判断回复的人是否是自己
   */
  const isReplySelf = computed(() => {
    return commentProps.value.userId === userStore.userId;
  });

  /**
   * 删除评论
   */
  const onDeleteComment = (id: string) => {
    isShowPopconfirm.value = true;
    deleteComment(id).then((resp) => {
      if (resp.code === 200) {
        isRemoving.value = true;
        emit('delete:comment', id);
      }
    });
  };

  const onLocalDeleteComment = (commentId: string) => {
    const updateList = replyList.value.filter((comment) => comment.id !== commentId);
    setTimeout(() => {
      replyList.value = updateList;
    }, 500);
  };

  const onCancelPopConfirm = () => {
    isShowPopconfirm.value = false;
  };
</script>

<style scoped>
  .list-item {
    opacity: 1;
    transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out;
    transform: translateY(0);
  }

  .list-item.removing {
    opacity: 0;
    transform: translateY(-20px);
  }
</style>
