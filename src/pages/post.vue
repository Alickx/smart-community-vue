<template>
  <navbar-common></navbar-common>
  <div class="main-container">
    <post-view
        v-if="isShowPostContent"
        :post-info=postInfo>
    </post-view>
    <post-send-comment
        @commentSuccess="commentSuccessHandler"
        v-if="isShowPostContent"
        :type="0"
        :input-row="5"
        :show-avatar="true"
        :to-member-info="postInfo.authorInfo"
        :first-comment-uid="null"
        :post-uid="postId">
    </post-send-comment>
    <post-comment-list
        :new-comment="newComment"
        v-if="isShowPostContent"
        :author-info="postInfo.authorInfo">
    </post-comment-list>
  </div>
</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, provide, ref} from "vue";
import {getPostByUid} from "../api/postapi";
import NavbarCommon from "../components/common/NavbarCommon.vue";
import PostCommentList from "../components/post/PostCommentList.vue";
import PostSendComment from "../components/post/PostSendComment.vue";
import PostView from "../components/post/PostView.vue";

const route = useRoute();

let postInfo = ref(null)
let isShowPostContent = ref(false)
let postId = ref('');
postId.value = route.params.id;

let newComment = ref(null)

const commentSuccessHandler = (comment)=>{
  newComment.value = comment;
}

onMounted(() => {
  getPostByUid(route.params.id).then(resp => {
    if (resp.data.code === 0) {
      postInfo.value = resp.data.data
      isShowPostContent.value = true;
    }
  })
})


</script>

<style scoped>
.main-container {
  position: relative;
  width: 100%;
  max-width: 960px;
  background-color: #ffffff;
  margin: 10px auto 0;
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
</style>
