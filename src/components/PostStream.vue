<template>
  <div class="post-filter-bar">
    <PostFilterBar @selectChange="changePostStream"></PostFilterBar>
  </div>
  <div class="post-view-list">
    <post-view
        v-if="isShowPost"
        :post-item-list="postItemList"></post-view>
  </div>
</template>

<script setup>

import PostView from "./PostListView.vue";
import PostFilterBar from "./PostFilterBar.vue";
import {onMounted, reactive, ref} from "vue";
import {getPostList} from "../api/postapi";

let postItemList = ref([]);

let isShowPost = ref(false);

const queryParam = reactive({
  curPage: 1,
  sectionUid: null,
  tagUid: null
})

onMounted(()=>{
  getPostList(queryParam).then(resp=>{
    if (resp.data.code === 0) {
      postItemList.value = resp.data.page.list;
      isShowPost.value = true;
    }
  })
})
const changePostStream = (selectForm)=>{
  queryParam.sectionUid = selectForm.sectionUid;
  queryParam.tagUid = selectForm.tagUid;
  getPostList(queryParam).then(resp=>{
    if (resp.data.code === 0) {
      postItemList.value = resp.data.page.list;
    }
  })
}



</script>


<style scoped>


</style>
