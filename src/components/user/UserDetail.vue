<template>
  <div class="post-view-list">
    <div v-if="!isShowPost" class="loading-skeleton">
      <a-skeleton active/>
      <a-skeleton active/>
      <a-skeleton active/>
      <a-skeleton active/>
    </div>
    <PostListView
        v-else-if="postItemList.length !== 0"
        :post-item-list="postItemList"></PostListView>
    <div v-else>
      <a-empty description="暂无数据"/>
    </div>
  </div>
</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import {queryPostByMemberUid, queryThumbByMemberUid} from "../../api/postapi";
import PostListView from "../post/PostListView.vue";

const route = useRoute();

let isShowPost = ref(false);
let postItemList = ref(null)

let queryParam = reactive({
  curPage: '1',
  sidx: "created_time",
  uid: route.params.id
})

const loadData = (type) => {
  isShowPost.value = false;
  switch (type) {
    case 'post': {
      queryPostByMemberUid(queryParam).then(resp => {
        if (resp.data.code === 0) {
          postItemList.value = resp.data.data.list
          setTimeout(() => {
            isShowPost.value = true
          }, 500)
        }
      })
      break;
    }
    case 'thumb': {
      queryThumbByMemberUid(queryParam).then(resp => {
        if (resp.data.code === 0) {
          postItemList.value = resp.data.data.list
          setTimeout(() => {
            isShowPost.value = true
          }, 500)
        }
      })
    }
  }
}

watch(() => route.params.type, (newType, oldType) => {
  loadData(newType)
})

onMounted(() => {
  loadData(route.params.type);
})


</script>

<style scoped>

.post-view-list {
  position: relative;
  width: 100%;
  max-width: 960px;
  background-color: #ffffff;
  margin: 10px auto 0;
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.loading-skeleton {
  height: 100vh;
}


</style>