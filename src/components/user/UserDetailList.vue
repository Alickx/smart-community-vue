<template>
  <div class="menu">
    <ul class="menu-list">
      <router-link class="menu-link"
                   :to="{name: 'userDetailList'}">
        <li class="menu-list-item">
          <span class="menu-item">文章</span>
        </li>
      </router-link>
      <router-link class="menu-link"
                   :to="{name: 'userDetail',params:{ type: 'thumb' }}">
        <li class="menu-list-item">
          <span class="menu-item">点赞</span>
        </li>
      </router-link>
      <router-link class="menu-link"
                   :to="{name: 'userDetail',params:{ type: 'collect' }}">
        <li class="menu-list-item">
          <span class="menu-item">收藏</span>
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

.menu-link {
  border-bottom: 2px solid #ffffff;
}

.active {
  border-bottom: 2px solid #40a9ff;
}


</style>