<template>
  <navbar-common></navbar-common>
  <div class="main-container">
    <post-view
        v-if="isShowPostContent"
        :post-info=postInfo>
    </post-view>
    <send-comment
        v-if="isShowPostContent"
        :type="0"
        :input-row="5"
        :show-avatar="true"
        :to-member-uid="postInfo.authorInfo.uid"
        :post-uid="postId">
    </send-comment>
    <post-comment-list
        v-if="isShowPostContent"
        :author-uid="postInfo.authorInfo.uid">
    </post-comment-list>
  </div>
</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, provide, ref} from "vue";
import {getPostByUid} from "../api/postapi";
import NavbarCommon from "../components/NavbarCommon.vue";
import PostView from "../components/PostView.vue";
import SendComment from "../components/PostSendComment.vue";
import PostCommentList from "../components/PostCommentList.vue";

const route = useRoute();

let postInfo = ref(null)
let isShowPostContent = ref(false)
let postId = ref('');
postId.value = route.params.id;


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