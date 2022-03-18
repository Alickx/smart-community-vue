<template>
  <navbar-common></navbar-common>
  <div class="main-container">
    <product-list></product-list>
  </div>
</template>

<script setup>

import NavbarCommon from "../components/common/NavbarCommon.vue";
import ProductList from "../components/product/ProductList.vue";
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
  min-height: 80vh;
}


</style>
