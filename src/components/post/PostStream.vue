<template>
  <div class="post-filter-bar">
    <PostFilterBar @selectChange="changePostStream"></PostFilterBar>
  </div>
  <div class="post-view-list">
    <div v-if="!isShowPost" class="loading-skeleton">
      <a-skeleton active />
      <a-skeleton active />
      <a-skeleton active />
      <a-skeleton active />
    </div>
    <post-view
      @loadNextPage="loadNextPageHandler"
      v-else-if="postItemList.length !== 0"
      :post-item-list="postItemList"
    ></post-view>
    <div v-else>
      <a-empty description="暂无数据" />
    </div>
  </div>
</template>

<script setup>

import PostView from "./PostListView.vue";
import PostFilterBar from "./PostFilterBar.vue";
import { onDeactivated, onMounted, reactive, ref } from "vue";
import { getCommentByPost, getPostList } from "../../api/postapi";

let postItemList = ref([]);

let isShowPost = ref(false);

let param = reactive({
  sectionUid: null,
  tagUid: null
})

let queryParam = reactive({
  curPage: 1,
  sidx: 'created_time',
  order: 'desc'
})

const totalPage = ref(0);

const loadNextPage = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let clientHeight = document.documentElement.clientHeight;
  let scrollHeight = document.documentElement.scrollHeight;
  if (scrollTop + clientHeight + 1 >= scrollHeight) { // 滚动到底部，逻辑代码
    if (queryParam.curPage < totalPage.value) {
      console.log("加载下一页")
      queryParam.curPage++;
      getPostList(param, queryParam).then(resp => {
        if (resp.data.code === 0) {
          postItemList.value = postItemList.value.concat(resp.data.data.list);
        }
      })
    }
  }

}

onMounted(() => {
  window.addEventListener('scroll', loadNextPage);
  getPostList(param, queryParam).then(resp => {
    if (resp.data.code === 0) {
      postItemList.value = resp.data.data.list;
      totalPage.value = resp.data.data.totalPage;
      setTimeout(() => {
        isShowPost.value = true;
      }, 800)
    }
  })
})
const changePostStream = (selectForm) => {
  param.sectionUid = selectForm.sectionUid;
  param.tagUid = selectForm.tagUid;
  isShowPost.value = false;
  getPostList(param, queryParam).then(resp => {
    if (resp.data.code === 0) {
      postItemList.value = resp.data.data.list;
      queryParam.curPage = 1;
      totalPage.value = resp.data.data.totalPage;
      setTimeout(() => {
        isShowPost.value = true;
      }, 800)
    }
  })
}

onDeactivated(() => {
  window.removeEventListener('scroll', loadNextPage);
})

</script>


<style scoped>
.loading-skeleton {
  height: 100vh;
}
</style>
