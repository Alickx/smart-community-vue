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
        <a>
          {{ commentItem.fromMember.nickName }}
        </a>
        <a v-if="commentItem.toMember.uid !== authorUid">
          回复 {{ commentItem.toMember.nickName }}
        </a>
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
          <span>{{ timeFormat(commentItem.createdTime) }}</span>
        </a-tooltip>
      </template>
      <div class="reply-list">
        <custom-comment
            :first-comment-uid="firstCommentUid"
            :comment-item="data"
            v-for="(data) in commentItem.replyInfo">
        </custom-comment>
      </div>
    </a-comment>
    <div class="reply-input" v-if="replyInputStatus">
      <post-send-comment
          :input-row="4"
          :to-member-uid="commentItem.fromMember.uid"
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
import {inject, onMounted, reactive, ref, toRefs} from "vue";
import {useRoute} from "vue-router";
import {thumbCancel, thumbSave} from "../api/postapi";

const props = defineProps({
  commentItem: {
    type: Object
  },
  firstCommentUid:{
    type: String
  },
  authorUid:{
    type: String
  }
})

const route = useRoute();
let postId = ref('');
postId.value = route.params.id


let replyInputStatus = ref(false);

const { commentItem } = toRefs(props);

const openReplyInput = () => {
  replyInputStatus.value = true;
}

const closeReplyInput = () => {
  replyInputStatus.value = false;
}

const nowTimeFormat = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

const timeFormat = (value) => {
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
}

const params = reactive({
  toUid: props.commentItem.uid
})

const thumbClickHandle = ()=>{
  thumbSave(params).then(resp=>{
    if (resp.data.code === 0) {
      console.log(commentItem)
      commentItem.value.isLike = true;
      commentItem.value.thumbCount++;
    }
  })
}

const thumbCancelHandle = ()=>{
  thumbCancel(params).then(resp=>{
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

.reply-list{
  width: 80%;
  padding: 0 60px 0 10px;
  background-color: #f9fafb;
}

.main-container{
  width: 100%;
}

</style>