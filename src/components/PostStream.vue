<template>
  <post-view></post-view>
</template>

<script setup>

import PostView from "./PostView.vue";
import {onMounted} from "vue";
import {getPostList} from "../api/post";

onMounted(()=>{
  getPostList().then(res=>{
    console.log(res)
  })
})


</script>

<style scoped>

</style>