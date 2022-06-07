<template>
  <header>
    <a-row type="flex" align="middle">
      <a-col :span="12">
        <div class="nav-left">
          <a id="logo" href="http://localhost:3000/">Smart Community</a>
          <div class="search-input">
            <a-input-search
                v-model:value="searchText"
                placeholder="搜索文章,用户..."
                enter-button="搜索"
                @search="searchHandler"
                size="large"
            />
          </div>
        </div>
      </a-col>
      <a-col :span="6">
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
      <a-col :span="6">
        <div v-if="!store.getters.getIsLogin" class="login-group">
          <a-button type="primary">
            <router-link :to="{ name: 'login' }">登录</router-link>
          </a-button>
          <a-button>
            <router-link :to="{ name: 'register' }">注册</router-link>
          </a-button>
        </div>
        <div v-else class="user-menu">
          <div style="margin-right: 25px">
            <router-link :to="{ name: 'postManagement' }" target="_blank">
              <a-button type="primary">
                <div class="tw-flex tw-justify-center tw-items-center">文章中心
                  <pie-chart-outlined class="tw-ml-1" />
                </div>
              </a-button>
            </router-link>
          </div>
          <a-popover placement="bottom" trigger="click">
            <template #content>
              <UserNavBarPanel></UserNavBarPanel>
            </template>
            <a-avatar :src="avatar" style="cursor: pointer;" size="48">
              <template #icon>
                <UserOutlined/>
              </template>
            </a-avatar>
          </a-popover>
          <router-link :to="{ name: 'postEdit',params: {id: 'new'}}">
            <img
                class="menu-item"
                src="https://songtiancloud-1300061766.cos.ap-guangzhou.myqcloud.com/img/编辑.png"
                alt
            />
          </router-link>
          <a-badge :count="notReadNotifyCount">
            <router-link
                v-slot="{ href }"
                custom
                :to="{ name: 'notification'}">
              <a :href="href" target="_blank">
                <img
                    class="menu-item"
                    src="https://songtiancloud-1300061766.cos.ap-guangzhou.myqcloud.com/img/通知.png"
                    alt
                />
              </a>
            </router-link>
          </a-badge>
        </div>
      </a-col>
    </a-row>
  </header>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {UserOutlined} from '@ant-design/icons-vue'
import UserNavBarPanel from "./UserNavBarPanel.vue";
import {useRoute, useRouter} from "vue-router";
import {PieChartOutlined} from '@ant-design/icons-vue'
import {queryNotificationNotReadCount} from "../../api/notifiapi";
import {useStore} from "vuex";

const store = useStore();

//搜索框value
let searchText = ref('');
let notReadNotifyCount = ref(0);
let interval = ref(10000);

const router = useRouter();
const route = useRoute();
const link = [
  {"name": "首页", "url": "/"},
]

let avatar = ref('');

if (store.getters.getIsLogin) {
  avatar = store.getters.getUserInfo.avatar !== undefined ? store.getters.getUserInfo.avatar : '';
}

const searchHandler = () => {
  if (route.name !== 'search') {
    let routerJump = router.resolve({name: 'search', query: {query: searchText.value, type: '0', sort: '0'}})
    window.open(routerJump.href, '_blank')
  } else {
    store.commit('setSearchKeyword', searchText.value);
    router.push({name: 'search', query: {query: searchText.value, type: '0', sort: '0'}})
  }
}


onMounted(() => {
  if (store.getters.getIsLogin) {
    queryNotificationNotReadCount().then(res => {
      notReadNotifyCount.value = res.data.count;
    })
  }
  if (route.query.query !== null) {
    searchText.value = route.query.query
  }
})


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
  margin-left: 35px;
}

.panel {
  position: absolute;
}
</style>
