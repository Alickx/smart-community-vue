<template>
  <div class="menu">
    <ul class="menu-list">
      <router-link class="menu-link" v-for="data in menuItemList" :key="data.key"
          :to="{name: 'userDetail',params:{ type: data.key }}">
        <li class="menu-list-item">
          <span class="menu-item">{{ data.label }}</span>
        </li>
      </router-link>
    </ul>
  </div>
  <router-view></router-view>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive} from "vue";

const router = useRouter();
const route = useRoute();

const id = route.params.id;


const menuItemList = reactive([
  {"label": "文章", key: 'post'},
  {"label": "点赞", key: 'thumb'},
  {"label": "收藏", key: 'collect'}
])

onMounted(()=>{
  //初始化访问用户文章
  router.push({name: 'userDetail',params:{ type: 'post' }})
})


</script>

<style scoped>

.menu {
  width: 100%;
  background-color: #ffffff;
}

.menu-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}

.menu-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 25px;
}

.menu-item {
  color: black;
  font-size: 19px;
  font-weight: 550;
}

.menu-link{
  border-bottom: 2px solid #ffffff;
}

.active {
  border-bottom: 2px solid #40a9ff;
}


</style>