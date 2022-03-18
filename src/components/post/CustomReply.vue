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
        <span style="padding-left: 8px; cursor: auto">
          {{ commentItem.thumbCount }}
        </span>
      </span>
        <span key="comment-basic-reply-to" v-if="replyInputStatus === false" @click.stop="openReplyInput">
          回复
        </span>
        <span v-else @click.stop="closeReplyInput">
          取消回复
        </span>
      </template>
      <template #author>
        <router-link
            v-slot="{ href }"
            custom
            :to="{ name:'user',param:{ id: commentItem.fromMember.uid } }">
          <a :href="href">{{ commentItem.fromMember.nickName }}</a>
        </router-link>
        <router-link
            v-if="commentItem.toMember.uid !== commentItem.fromMember.uid"
            v-slot="{ href }"
            custom
            :to="{ name:'user',param:{ id: commentItem.toMemberUid } }">
          回复
          <a :href="href">{{ commentItem.toMember.nickName }}</a>
        </router-link>
      </template>
      <template #avatar>
        <a-avatar
            :src="commentItem.fromMember.avatar"
            :alt="commentItem.fromMember.nickName"
        />
      </template>
      <template #content>
        <p>
          {{ commentItem.content }}
        </p>
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
          :type="0"
          :show-avatar="false">
      </post-send-comment>
    </div>
  </div>
</template>
<script setup>
import dayjs from "_dayjs@1.10.8@dayjs";
import {LikeFilled, LikeOutlined} from "@ant-design/icons-vue"
import PostSendComment from "./PostSendComment.vue";
import {reactive, ref, toRefs} from "vue";
import {useRoute} from "vue-router";
import {thumbCancel, thumbSave} from "../../api/postapi";
import userStore from "../../store/userStore";

const props = defineProps({
  commentItem: {
    type: Object
  },
  firstCommentUid: {
    type: String
  }
})

const store = userStore;
const route = useRoute();
const emit = defineEmits([
  "sendReplySuccess"
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

const params = reactive({
  toUid: props.commentItem.uid
})

/**
 * 回复
 * @param param
 * @param firstCommentUid
 */
const replySuccessHandler = (param,firstCommentUid) => {
  emit('sendReplySuccess', param,firstCommentUid)
  closeReplyInput()
}

const thumbClickHandle = () => {
  thumbSave(params).then(resp => {
    if (resp.data.code === 0) {
      console.log(commentItem)
      commentItem.value.isLike = true;
      commentItem.value.thumbCount++;
    }
  })
}

const thumbCancelHandle = () => {
  thumbCancel(params).then(resp => {
    if (resp.data.code === 0) {
      commentItem.value.isLike = false;
      commentItem.value.thumbCount--;
    }
  })
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