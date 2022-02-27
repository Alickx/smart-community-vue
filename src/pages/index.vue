<template>
  <main class="main-container">
    <PostFilterBar></PostFilterBar>
    <PostStream></PostStream>
  </main>
</template>

<script setup>


import PostFilterBar from "../components/PostFilterBar.vue";
import PostStream from "../components/PostStream.vue";
</script>

<style scoped>

.main-container{
  position: relative;
  width: 100%;
  max-width: 960px;
  background-color: #ffffff;
  margin: 10px auto 0;
  padding: 25px;
}



</style>