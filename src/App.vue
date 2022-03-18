<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>


<script setup>


</script>
<style>



/*!* 把我们所有标签的内外边距清零 *!*/
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a:hover {
  color: #007fff !important;
}

html {
  overflow-y: scroll;
  overflow-x: hidden;
}

.container {
  background-color: #f4f5f5;
}

body {
  background-color: #f4f5f5 !important;
  height: auto!important;
}
</style>
