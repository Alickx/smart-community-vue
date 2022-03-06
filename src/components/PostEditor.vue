<template>
  <v-md-editor
      v-model="text"
      @change="changeHandle"
      height="600px">
  </v-md-editor>
</template>

<script setup>

import {ref} from "vue";



let text = ref('')

let emit = defineEmits(["textChange"])

const changeHandle = (text,html)=>{
  console.log(text)
  emit("textChange",text);
}


</script>

<style scoped>

</style>