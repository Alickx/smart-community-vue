<template>
  <NavbarCommon></NavbarCommon>
  <main class="main-container">
    <div class="post-stream">
      <PostStream></PostStream>
    </div>
  </main>
</template>

<script setup>


import PostStream from "../components/post/PostStream.vue";
import NavbarCommon from "../components/common/NavbarCommon.vue";
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
  flex-wrap: wrap;
}


</style>
