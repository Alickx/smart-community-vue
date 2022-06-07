<template>
  <navbar-common></navbar-common>
  <div class="container">
    <a-button size="large" type="primary" @click="router.replace('/')">返回首页</a-button>
  </div>
</template>

<script setup>

import NavbarCommon from "../components/common/NavbarCommon.vue";
import {useRouter} from "vue-router";


const router = useRouter();





</script>



<style scoped lang="less">

.container{
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>