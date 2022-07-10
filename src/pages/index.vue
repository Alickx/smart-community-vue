<template>
  <NavbarCommon></NavbarCommon>
  <div class="tw-flex tw-flex-row">
    <main class="main-container">
      <div class="post-stream">
        <PostStream></PostStream>
      </div>
    </main>
    <div class="sidebar-right">
      <div class="check-in">
        <check-in></check-in>
      </div>
    </div>
  </div>
</template>

<script setup>


import PostStream from "../components/post/PostStream.vue";
import NavbarCommon from "../components/common/NavbarCommon.vue";
import CheckIn from "../components/common/CheckIn.vue";
</script>

<style scoped>


.main-container {
  position: relative;
  width: 100%;
  max-width: 850px;
  background-color: #ffffff;
  padding: 25px;
  margin: 30px 30px 20px 200px;
}

@media (max-width: 1060px) {
  .main-container {
    margin: 30px auto 20px;
  }
}

.sidebar-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}


</style>
