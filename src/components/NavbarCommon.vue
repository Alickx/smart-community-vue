<template>
  <header>
    <a-row type="flex" align="middle">
      <a-col :span="12">
        <div class="nav-left">
          <a id="logo" href="http://localhost:3000/">Smart Community</a>
          <div class="search-input">
            <a-input-search
                v-model="searchValue"
                placeholder="搜索文章,用户..."
                enter-button="搜索"
                size="large"
            />
          </div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="nav-links">
          <div class="item" v-for="(data, index) in link" :key="index">
            <router-link :to="data.url" custom v-slot="{ href, isActive }">
              <div class="nav-link" :class="{ active: isActive }">
                <a :href="href">{{ data.name }}</a>
              </div>
            </router-link>
          </div>
        </div>
      </a-col>
      <a-col :span="4">
        <div v-if="!userStore.getters.getIsLogin" class="login-group">
          <a-button type="primary">
            <router-link to="login">登录</router-link>
          </a-button>
          <a-button>
            <router-link to="register">注册</router-link>
          </a-button>
        </div>
        <div v-else class="user-menu">
          <a target="_blank">
            <a-avatar
                :src="store.getters.getUserInfo.avatar"
                @click="test"
                size="48">
              <template #icon>
                <UserOutlined/>
              </template>
            </a-avatar>
          </a>
          <router-link :to="{ name: 'postEdit' }">
            <img class="menu-item"
                 src="https://songtiancloud-1300061766.cos.ap-guangzhou.myqcloud.com/img/编辑.png" alt="">
          </router-link>
          <a target="_blank">
            <img class="menu-item"
                 src="https://songtiancloud-1300061766.cos.ap-guangzhou.myqcloud.com/img/文章.png" alt="">
          </a>
          <a-badge count="5">
            <a target="_blank">
              <img class="menu-item"
                   src="https://songtiancloud-1300061766.cos.ap-guangzhou.myqcloud.com/img/通知.png" alt="">
            </a>
          </a-badge>
        </div>
      </a-col>
    </a-row>
  </header>
</template>

<script setup>

import {ref} from "vue";
import userStore from "../store/userStore";
import {UserOutlined} from '@ant-design/icons-vue'

const store = userStore;

//搜索框value
let searchValue = ref();

const link = [
  {"name": "首页", "url": "/"},
  {"name": "道具城", "url": "1"},
  {"name": "活动", "url": "2"},
  {"name": "资讯", "url": "3"},
  {"name": "关于我们", "url": "4"}
]

const test = () => {
  console.log("Hello,World!")
}

</script>

<style scoped>
header {
  border-bottom: 1px solid #ededee;
  background-color: #fff;
  height: 70px;
}

.nav-left {
  height: 70px;
  display: flex;
  align-items: center;
}

.search-input {
  margin-left: 60px;
  width: 400px;
}

#logo {
  height: 64px;
  padding-left: 40px;
  overflow: hidden;
  color: #000000d9;
  font-size: 20px;
  font-weight: 600;
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji", sans-serif;
  line-height: 64px;
  white-space: nowrap;
  text-decoration: none;
}

.nav-links {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

.item:not(:first-child) {
  margin-left: 45px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  border-bottom: 3px solid #40a9ff;
}

.nav-link {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link:hover {
  border-bottom: 3px solid #40a9ff;
  transition: 0.2s all linear;
  transition-delay: 0.1s;
}

.nav-link a {
  color: black;
  font-size: 18px;
  font-weight: 400;
}

.login-group {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
}

.user-menu {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.menu-item {
  width: 21px;
  height: 21px;
}

.menu-item {
  margin-left: 25px;
}
</style>
