<template>
  <div class="main-container">
    <a-comment class="comment-contain">
      <template #actions>
        <span key="comment-basic-like">
          <a-tooltip title="点赞">
            <template v-if="commentItem.isLike !== true">
              <LikeOutlined @click="thumbClickHandle"/>
            </template>
            <template v-else>
              <LikeFilled @click="thumbCancelHandle"/>
            </template>
          </a-tooltip>
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
            @confirm="clickDelReply(commentItem.uid)"
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
            v-slot="{ href }"
            custom
            :to="{ name: 'user', param: { id: commentItem.fromMember.uid } }"
        >
          <a :href="href">{{ commentItem.fromMember.nickName }}</a>
        </router-link>
        <router-link
            v-if="commentItem.toMember.uid !== commentItem.fromMember.uid"
            v-slot="{ href }"
            custom
            :to="{ name: 'user', param: { id: commentItem.toMemberUid } }"
        >
          回复
          <a :href="href">{{ commentItem.toMember.nickName }}</a>
        </router-link>
      </template>
      <template #avatar>
        <a-avatar :src="commentItem.fromMember.avatar" :alt="commentItem.fromMember.nickName"/>
      </template>
      <template #content>
        <p>{{ commentItem.content }}</p>
      </template>
      <template #datetime>
        <a-tooltip :title="nowTimeFormat">
          <span>{{ formatTime(commentItem.createdTime) }}</span>
        </a-tooltip>
      </template>
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
import {ref, toRefs} from "vue";
import {useRoute} from "vue-router";
import {thumbCancel, thumbSave, delComment} from "../../api/postapi";
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
  }
})

const store = useStore();
const route = useRoute();
const emit = defineEmits([
  "sendReplySuccess", "delReplySuccess"
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
 * @param firstCommentUid
 */
const replySuccessHandler = (param, firstCommentUid) => {
  emit('sendReplySuccess', param, firstCommentUid)
  closeReplyInput()
}

/**
 * 点赞
 */
const thumbClickHandle = () => {
  const params = {
    toMemberUid: commentItem.value.fromMember.uid,
    toUid: commentItem.value.uid,
    postUid: postId.value,
    type: thumbConstant.THUMB_REPLY_TYPE
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
    toUid: commentItem.value.uid,
    postUid: postId.value,
    type: thumbConstant.THUMB_REPLY_TYPE
  }
  thumbCancel(params).then(resp => {
    if (resp.data.code === 0) {
      commentItem.value.isLike = false;
      commentItem.value.thumbCount--;
    }
  })
}


const clickDelReply = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = {
        uid: value
      }
      delComment(data).then(resp => {
        if (resp.data.code === 0) {
          message.success("删除评论成功");
          emit('delReplySuccess', value);
          resolve()
        }
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
</style>
