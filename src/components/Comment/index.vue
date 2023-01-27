<template>
  <div class="flex flex-row" ref="commentRef">
    <div class="mr-5">
      <!--   头像,发布时间-->
      <Avatar v-if="type === commentType.COMMENT" :src="comment.userProfile.avatar" :height="3" :width="3"/>
      <Avatar v-else :src="comment.userProfile.avatar" :height="2" :width="2"/>
    </div>
    <div class="flex flex-col flex-1">
      <!-- 一级评论主体-->
      <div class="flex flex-col space-y-5">
        <!-- 作者名 -->
        <div class="flex flex-row items-center space-x-5">
          <div class="flex items-center space-x-2">
              <span class="cursor-pointer font-bold text-[18px] color-[000000]">{{ comment.userProfile.nickName }}</span>
              <span class="font-normal text-sm color-gray" v-if="comment.expansion.isAuthor">(作者)</span>
          </div>
          <!-- 评论时间 -->
          <span class="color-gray-400 text-md font-normal">{{ dateFormatDay(comment.createTime) }}</span>
        </div>
        <!--   评论内容-->
        <p>
            {{ comment.content }}
        </p>
        <!-- 回复和点赞按钮 -->
        <div class="flex flex-row flex-nowrap space-x-5 items-center">
          <div class="flex flex-row flex-nowrap items-center space-x-1 cursor-pointer hover:color-[blue]">
            <SvgIcon @click.stop="thumbHandle(comment.id,comment.expansion.isThumb)" name="svg-thumb"
                     :color="comment.expansion.isThumb ? 'blue' : 'black'" size="20px"/>
            <span>{{ comment.thumbCount === 0 ? '点赞' : comment.thumbCount }}</span>
          </div>
          <div @click="showReplyInput(comment.id)"
               class="flex flex-row flex-nowrap items-center space-x-1 cursor-pointer hover:color-[blue]">
            <SvgIcon name="svg-comment"
                     :color="comment.expansion.isComment ? 'blue' : 'black'" size="20px"/>
            {{ showReplyInputId === comment.id ? '收起' : '回复' }}
          </div>
          <div class="flex flex-1" v-if="isShowPopconfirm || (isReplySelf && isShowDelete)">
            <el-popconfirm title="是否删除该评论" @confirm="onDeleteComment" @cancel="onCancelPopConfirm">
              <template #reference>
                <span class="cursor-pointer color-red">删除</span>
              </template>
            </el-popconfirm>
          </div>
        </div>
        <!-- 回复组件 -->
        <div class="h-45 w-full" v-if="showReplyInputId === comment.id" ref="commentInputRef">
          <CommentInput
              @comment:submit="onCommentSubmit"
              @reply:submit="onReplySubmit"
              :type="commentType.REPLY"
              :first-comment-id="type === commentType.COMMENT ? comment.id : comment.firstCommentId"
              :post-id="postId"
              :to-user-id="comment.userId"/>
        </div>
      </div>
      <!-- 二级评论 -->
      <div v-if="type === commentType.COMMENT && replyList?.length > 0"
           class="p-5 bg-[#f9fafb] rounded-lg mt-5 space-y-6">
        <Reply v-for="reply in replyList" :key="reply.id"
               :type="commentType.REPLY"
               :post-id="postId"
               :comment="reply"></Reply>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onClickOutside, useDebounceFn, useElementHover} from '@vueuse/core';
import {cancelThumb, pageComment, saveThumb} from '/@/api/post';
import {CommentDTO} from '/@/api/post/types';
import Avatar from '/@/components/Avatar/index.vue';
import {thumbType} from '/@/constant/ThumbType';
import {dataFormat, dateFormatDay} from '/@/utils/DateFormatUtil';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import {commentType} from "/@/constant/CommentType";
import CommentInput from "/@/components/CommentInput/index.vue";
import Reply from "/@/components/Comment/index.vue";
import {PropType} from "vue";
import {useUserStore} from "/@/store";
import {UserProfileDTO} from "/@/api/user/types";


const props = defineProps({
  comment: {
    type: Object as PropType<CommentDTO>,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  type: {
    type: Number as PropType<commentType>,
    required: true
  }
})

let params = ref({
  postId: props.postId,
  firstCommentId: props.comment.id,
  page: 1,
  size: 5,
  type: commentType.REPLY,
  sort: "create_time,desc",
})

const userStore = useUserStore()
const router = useRouter();
let replyList = ref(props.comment?.replyList?.records)
let commentInputRef = ref();
let commentRef = ref();
let showReplyInputId = ref<String>('');
let isShowPopconfirm = ref(false);
const isShowDelete = useElementHover(commentRef);


onClickOutside(commentInputRef, () => {
  showReplyInputId.value = ''
})

const pageRequest = () => {
  pageComment(params.value).then(resp => {
    if (resp.code === 200) {
      replyList.value = resp.data.records;
    }
  })
}

const onCommentSubmit = (data,id) => {
  let commentDTO = generateComment(data,id);
  replyList.value.unshift(commentDTO);
}

const onReplySubmit = (data,id) => {
  let commentDTO = generateComment(data,id);
  replyList.value.unshift(commentDTO);
}

/**
 * 生成评论实体
 * @param data 评论信息
 * @param id 评论id
 */
const generateComment = (data,id) => {
  // 评论成功后本地添加评论
  let comment:CommentDTO = {
    content: data.content,
    createTime: dataFormat(new Date()),
    expansion: {
      isAuthor: false,
      isComment: false,
      isThumb: false,
      isCollect: false
    },
    firstCommentId: data.firstCommentId,
    postId: data.postId,
    replyList: {
      records: [],
      total: 0
    },
    thumbCount: 0,
    toUserId: data.toUserId,
    type: commentType.COMMENT,
    userId: userStore.userId as string,
    userProfile: userStore.getUserProfile as UserProfileDTO,
    id: id
  }
  return comment;
}

/**
 * thumbState false 未点赞 true 已点赞
 *
 */
const debounceThumbHandle = useDebounceFn((id: string, thumbState: boolean) => {
  if (!thumbState) {
    saveThumb(id, thumbType.COMMENT);
  } else {
    cancelThumb(id, thumbType.COMMENT);
  }
}, 400)

/**
 * 点赞操作
 * @param id 目标id
 * @param thumbState 点赞状态
 */
const thumbHandle = (id: string, thumbState: boolean) => {
  if (!userStore.getIsLogin) {
    router.push({
      name: 'Login'
    });
    return;
  }
  if (!thumbState) {
    props.comment.thumbCount = props.comment.thumbCount + 1;
    props.comment.expansion.isThumb = true;
  } else {
    // 取消点赞
    props.comment.thumbCount = props.comment.thumbCount - 1;
    props.comment.expansion.isThumb = false;
  }
  // 请求
  debounceThumbHandle(id, thumbState);
}

/**
 * 显示回复输入框
 * @param id 目标id
 */
const showReplyInput = (id: string) => {
  if (showReplyInputId.value !== id) {
    showReplyInputId.value = id;
  } else {
    showReplyInputId.value = '';
  }
}

/**
 * 判断回复的人是否是自己
 */
const isReplySelf = () => {
  return props.comment?.userId === userStore.userId;
}

/**
 * 删除评论
 */
const onDeleteComment = (id: string) => {
  isShowPopconfirm.value = true;
  console.log(id)
}

const onCancelPopConfirm = () => {
  isShowPopconfirm.value = false;
}



</script>

<style scoped>

</style>