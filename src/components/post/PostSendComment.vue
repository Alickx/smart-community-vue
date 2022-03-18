<template>
  <div class="main-container">
    <div class="send-message-contain">
      <div class="avatar" v-if="store.getters.getIsLogin && showAvatar">
        <a-avatar :size="45" :src="store.getters.getUserInfo.avatar"></a-avatar>
      </div>
      <div class="comment-input">
        <a-textarea v-model:value="params.content"
                    :rows="inputRow"
                    show-count
                    :maxlength="100"/>
      </div>
    </div>
    <div class="submit-button">
      <a-button type="primary"
                @click="sendComment"
                :disabled="content === ''">发送
      </a-button>
    </div>
  </div>
</template>
<script setup>

import userStore from "../../store/userStore";
import {reactive, ref, toRefs} from "vue";
import {saveComment} from "../../api/postapi";
import {message} from "ant-design-vue";
import {useRoute} from "vue-router";

const props = defineProps({
  toMemberInfo: {
    type: Object
  },
  firstCommentUid: {
    type: String
  },
  type: {
    type: Number
  },
  showAvatar: {
    type: Boolean,
    default: true
  },
  inputRow: {
    type: Number,
    default: 5
  }
})

const store = userStore;
const route = useRoute();

const emit = defineEmits([
  'commentSuccess', 'replySuccess'
])

const params = reactive({
  postUid: route.params.id,
  toMemberUid: props.toMemberInfo.uid,
  firstCommentUid: props.firstCommentUid,
  type: props.type,
  content: ''
})

const {toMemberInfo} = toRefs(props)

const sendComment = () => {
  saveComment(params).then(resp => {
    if (resp.data.code === 0) {
      message.success("发送评论成功");
      const param = {
        userContent: params.content,
        memberInfo: toMemberInfo.value,
        uid: resp.data.data
      }
      if (props.firstCommentUid !== null) {
        console.log("reply=", param, props.firstCommentUid)
        emit('replySuccess', param, props.firstCommentUid);
        params.content = ''
      } else {
        emit('commentSuccess', param);
        params.content = ''
      }
    }
  })
}


</script>

<style scoped>

.main-container {
  display: flex;
  flex-direction: column;
}

.send-message-contain {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.submit-button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.comment-input {
  margin-left: 60px;
  width: 100%;
}

/*/deep/ .comment-input textarea {*/
/*  min-height: 120px;*/
/*  min-width: 100%;*/
/*}*/

.avatar {
  display: flex;
  justify-content: center;
}

</style>
