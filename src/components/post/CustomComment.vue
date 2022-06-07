<template>
  <div class="main-container">
    <a-comment class="comment-contain">
      <template #actions>
        <span key="comment-basic-like">
            <template v-if="commentItem.isLike !== true">
              <LikeOutlined @click="thumbClickHandle"/>
            </template>
            <template v-else>
              <LikeFilled @click="thumbCancelHandle"/>
            </template>
          <span style="padding-left: 8px; cursor: auto">{{ commentItem.thumbCount }}</span>
        </span>
        <span
            key="comment-basic-reply-to"
            v-if="replyInputStatus === false"
            @click.stop="openReplyInput"
        >回复</span>
        <span v-else @click.stop="closeReplyInput">取消回复</span>
        <a-popconfirm
            title="是否要删除该评论？"
            ok-text="删除"
            cancel-text="取消"
            @confirm="clickDelComment(commentItem.uid)"
            v-if="commentItem.fromMember.uid === store.getters.getUserInfo.uid"
        >
          <a
              href="javascript:void(0)"
          >删除
          </a>
        </a-popconfirm>
      </template>
      <template #author>
        <router-link
            :to="{ name: 'user', params: { id: commentItem.fromMember.uid } }"
            target="_blank"
        >
          {{ commentItem.fromMember.nickName }}
        </router-link>
        <router-link
            v-if="commentItem.toMember.uid !== commentItem.fromMember.uid"
            v-slot="{ href }"
            custom
            :to="{ name: 'user', params: { id: commentItem.toMember.uid} }"
        >
          <span v-if="commentItem.uid !== firstCommentUid">回复</span>
          <a
              :href="href"
              target="_blank"
              v-if="commentItem.toMember.uid !== authorInfo.uid"
          >{{ commentItem.toMember.nickName }}</a>
        </router-link>
      </template>
      <template #avatar>
        <router-link
            :to="{ name: 'user', params: { id: commentItem.fromMember.uid } }"
            target="_blank"
        >
          <a-avatar :src="commentItem.fromMember.avatar" :alt="commentItem.fromMember.nickName"/>
        </router-link>
      </template>
      <template #content>
        <p>{{ commentItem.content }}</p>
      </template>
      <template #datetime>
        <a-tooltip>
          <span>{{ formatTime(commentItem.createdTime) }}</span>
        </a-tooltip>
      </template>
      <div class="reply-list">
        <custom-reply
            @delReplySuccess="delReplySuccessHandler"
            @sendReplySuccess="replySuccessHandler"
            :first-comment-uid="firstCommentUid"
            :comment-item="data"
            v-for="(data) in commentItem.replyInfo"
        ></custom-reply>
      </div>
    </a-comment>
    <div class="reply-input" v-if="replyInputStatus">
      <post-send-comment
          @replySuccess="replySuccessHandler"
          :input-row="4"
          :to-member-info="commentItem.fromMember"
          :first-comment-uid="firstCommentUid"
          :type="1"
          :show-avatar="false"
      ></post-send-comment>
    </div>
  </div>
</template>
<script setup>
import {LikeFilled, LikeOutlined} from "@ant-design/icons-vue"
import PostSendComment from "./PostSendComment.vue";
import {reactive, ref, toRefs} from "vue";
import {useRoute} from "vue-router";
import {thumbCancel, thumbSave, delComment} from "../../api/postapi";
import CustomReply from "./CustomReply.vue";
import {message} from "ant-design-vue";
import dayjs from "dayjs";
import {useStore} from "vuex";
import thumbConstant from "../../util/thumbConstant";

const props = defineProps({
  commentItem: {
    type: Object
  },
  firstCommentUid: {
    type: String
  },
  authorInfo: {
    type: Object
  }
})

const store = useStore();
const route = useRoute();
const emit = defineEmits([
  "sendReplySuccess", "delCommentSuccess"
])

let postId = ref('');
postId.value = route.params.id


let replyInputStatus = ref(false);
const {commentItem} = toRefs(props);

const openReplyInput = () => {
  replyInputStatus.value = true;
}

const closeReplyInput = () => {
  replyInputStatus.value = false;
}

const formatTime = (time) => {
  return dayjs(time).toNow();
}

/**
 * 回复
 * @param param
 * @param firstCommentUid 第一条回复的uid
 */
const replySuccessHandler = (param, firstCommentUid) => {
  const {userContent, memberInfo, uid} = param
  const reply = {
    content: userContent,
    createdTime: new Date(),
    fromMember: store.getters.getUserInfo,
    isLike: false,
    replyInfo: null,
    thumbCount: 0,
    toMember: memberInfo,
    uid: uid
  }
  console.log(reply,firstCommentUid)
  emit('sendReplySuccess', reply, firstCommentUid)
  replyInputStatus.value = false;
}

/**
 * 点赞
 */
const thumbClickHandle = () => {
  console.log(commentItem);
  const params = {
    toMemberUid: commentItem.value.fromMember.uid,
    toUid: commentItem.value.uid,
    postUid: postId.value,
    type: thumbConstant.THUMB_COMMENT_TYPE
  }
  thumbSave(params).then(resp => {
    if (resp.data.code === 0) {
      commentItem.value.isLike = true;
      commentItem.value.thumbCount++;
    }
  })
}

/**
 * 取消点赞
 */
const thumbCancelHandle = () => {
  const params = {
    toMemberUid: commentItem.value.fromMember.uid,
    toUid: commentItem.value.id,
    postUid: postId.value,
    type: thumbConstant.THUMB_COMMENT_TYPE
  }
  thumbCancel(params).then(resp => {
    if (resp.data.code === 0) {
      commentItem.value.isLike = false;
      commentItem.value.thumbCount--;
    }
  })
}

/**
 * 从集合中删除评论
 * @param value
 */
const delReplySuccessHandler = (value) => {
  commentItem.value.replyInfo = commentItem.value.replyInfo.filter(item => {
    return item.uid !== value;
  })
}

/**
 * 删除评论
 * @param value
 * @returns {Promise<unknown>}
 */
const clickDelComment = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        uid: value
      }
      delComment(data).then(resp => {
        if (resp.data.code === 0) {
          message.success("删除评论成功");
          emit('delCommentSuccess', value);
          resolve()
        }
        reject()
      })
    }, 1000);
  });
}


</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
}

.reply-list {
  width: 80%;
  padding: 0 60px 0 10px;
  background-color: #f9fafb;
}

.main-container {
  width: 100%;
}

#del {
  display: flex;
  flex-direction: row-reverse;
}
</style>
