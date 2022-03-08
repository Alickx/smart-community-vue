<template>
  <v-md-editor
      v-model="postContent.text"
      @change="changeHandle"
      height="600px">
  </v-md-editor>
</template>

<script setup>

import {reactive, ref} from "vue";


const postContent = reactive({
  text: '',
  html: ''
})

let emit = defineEmits(["textChange"])

const changeHandle = (text,html)=>{
  postContent.html = html;
  emit("textChange",postContent);
}


</script>

<style scoped>

</style>