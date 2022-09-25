<template>
  <div class="login-form-container">
    <login-form/>
  </div>
</template>

<script lang="ts" setup name="ViewsLoginIndex">
import LoginForm from './components/LoginForm/index.vue'


</script>

<style lang="less" scoped>

.login-form-container {
  width: 100vw;
  height: 100vh;
  background-color: #e0e4e8;
  display: grid;
  place-items: center;
}


</style>
