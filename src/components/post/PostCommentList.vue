<template>
  <div class="main-contaner">
    <a-list
        :header="`${totalCount} 条回复`"
        item-layout="horizontal"
        :data-source="commentList"
        class="comment-list"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <custom-comment
              :author-info="authorInfo"
              @sendReplySuccess="sendReplySuccessHandler"
              @delCommentSuccess="delCommentSuccessHandler"
              :first-comment-uid="item.uid"
              :comment-item="item"
          >
          </custom-comment>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup>

import {onDeactivated, onMounted, reactive, ref, toRefs, watch} from "vue";
import {getCommentByPost} from "../../api/postapi";
import {useRoute} from "vue-router";
import CustomComment from "./CustomComment.vue";

const props = defineProps({
  newComment: {
    type: Object
  },
  authorInfo: {
    type: Object
  }
})


let commentList = ref([]);
const route = useRoute();

const sendReplySuccessHandler = (reply, firstCommentUid) => {
  for (let item of commentList.value) {
    if (item.uid === firstCommentUid) {
      if (item.replyInfo != null) {
        item.replyInfo.push(reply);
      } else {
        item.replyInfo = [];
        item.replyInfo.push(reply);
      }
    }
  }
}

const delCommentSuccessHandler = (value) => {
  commentList.value = commentList.value.filter(item => {
    return item.uid !== value
  })
}

const {newComment} = toRefs(props);

//监听新的评论
watch(() => {
  newComment.value
}, () => {
  const {memberInfo, userContent, uid} = newComment.value;
  const comment = {
    content: userContent,
    createdTime: new Date(),
    fromMember: memberInfo,
    isLike: false,
    replyInfo: null,
    thumbCount: 0,
    toMember: props.authorInfo,
    uid: uid
  }
  commentList.value.unshift(comment)
}, {deep: true})

const totalPage = ref(0);
const totalCount = ref(0)

const queryParam = reactive({
  curPage: 1,
  sidx: "created_time",
  order: "desc"
})

const loadNextPage = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight = document.documentElement.clientHeight;
  let scrollHeight = document.documentElement.scrollHeight;
  if (scrollTop + clientHeight >= scrollHeight) { // 滚动到底部，逻辑代码
    if (queryParam.curPage < totalPage.value) {
      console.log("加载下一页")
      queryParam.curPage++;
      getCommentByPost(queryParam, route.params.id).then(resp => {
        if (resp.data.code === 0) {
          totalPage.value = resp.data.data.totalPage
          commentList.value = commentList.value.concat(resp.data.data.list)
        }
      })
    }
  }

}

onMounted(() => {
  window.addEventListener('scroll', loadNextPage);
  getCommentByPost(queryParam, route.params.id).then(resp => {
    if (resp.data.code === 0) {
      totalPage.value = resp.data.data.totalPage
      totalCount.value = resp.data.data.totalCount
      commentList.value = resp.data.data.list
    }
  })
})

onDeactivated(() => {
  window.removeEventListener('scroll', loadNextPage);
})


</script>

<style scoped>
</style>
