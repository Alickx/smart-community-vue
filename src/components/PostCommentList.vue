<template>
  <div class="main-contaner">
    <a-list
        :header="`${commentList.length} 条回复`"
        item-layout="horizontal"
        :data-source="commentList"
        class="comment-list">
      <template #renderItem="{ item }">
        <a-list-item>
          <custom-comment
              :author-uid="authorUid"
              :first-comment-uid="item.uid"
              :comment-item="item"></custom-comment>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getCommentByPost} from "../api/postapi";
import {useRoute} from "vue-router";
import CustomComment from "./CustomComment.vue";


const commentList = ref([]);
const route = useRoute();


const props = defineProps({
  authorUid: {
    type: String
  }
})

onMounted(() => {
  getCommentByPost(route.params.id).then(resp => {
    if (resp.data.code === 0) {
      commentList.value = resp.data.data
    }
  })
})


</script>

<style scoped>


</style>