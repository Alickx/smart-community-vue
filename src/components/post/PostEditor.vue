<template>
  <v-md-editor
      v-model="postContent.text"
      @change="changeHandle"
      height="600px">
  </v-md-editor>
</template>

<script setup>

import {reactive} from "vue";


let postContent = reactive({
  text: '',
  html: ''
})

let emit = defineEmits(["textChange"])

const changeHandle = (text,html)=>{
  postContent.html = html;
  emit("textChange",postContent);
}

const setPostContent = (post)=>{
  postContent.text = post.text;
  postContent.html = post.html;
}

defineExpose({
  setPostContent
})



</script>

<style scoped>

</style>