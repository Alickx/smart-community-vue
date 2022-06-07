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
  max-width: 850px;
  background-color: #ffffff;
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 30px auto 20px 200px;
}

@media (max-width: 1060px) {
  .main-container {
    margin: 30px auto 20px;
  }
}


</style>
