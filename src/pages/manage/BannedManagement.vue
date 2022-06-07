<template>
  <Toolbar @searchEmit="searchEmitHandler"></Toolbar>
  <UserList ref="userListRef"></UserList>
</template>

<script setup>
import Toolbar from "../../components/manage/Toolbar.vue";
import UserList from "../../components/manage/UserList.vue";
import {ref} from "vue";

const userListRef = ref(null);

const searchEmitHandler = (params)=>{
  userListRef.value.getBanUser(params);
}



</script>

<style scoped>

</style>