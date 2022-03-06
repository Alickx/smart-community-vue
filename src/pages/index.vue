<template>
  <NavbarCommon></NavbarCommon>
  <main class="main-container">
    <div class="post-stream">
      <PostStream></PostStream>
    </div>
  </main>
</template>

<script setup>


import PostFilterBar from "../components/PostFilterBar.vue";
import PostStream from "../components/PostStream.vue";
import NavbarCommon from "../components/NavbarCommon.vue";
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
  flex-wrap: nowrap;
}


</style>
