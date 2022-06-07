<template>
  <navbar-common></navbar-common>
  <main class="main-container">
    <div class="container main-container">
      <div class="view user-view">
        <div class="major-area">
          <div class="user-info-block block shadow">
            <UserInfo
                v-if="targetUserInfo"
                :target-user-info="targetUserInfo"
            />
          </div>
          <div class="list-block">
            <div class="menu">
              <ul class="menu-list">
                <router-link class="menu-link"
                             :to="{name: 'user'}">
                  <li class="menu-list-item" :class="{ active:route.name === 'user' }">
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
            <UserDefaultShow v-if="route.name === 'user'"></UserDefaultShow>
            <router-view v-else></router-view>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import NavbarCommon from "../components/common/NavbarCommon.vue";
import {getMemberInfoByUid} from "../api/memberapi";
import UserInfo from "../components/user/UserInfo.vue";
import UserDefaultShow from "../components/user/UserDefaultShow.vue";

const targetUserInfo = ref();
const route = useRoute()


onMounted(() => {
  getMemberInfoByUid(route.params.id).then(resp => {
    if (resp.data.code === 0) {
      targetUserInfo.value = resp.data.data
    }
  })
})


</script>

<style scoped>

.list-block {
  margin-top: 1rem;
}

.user-info-block {
  display: flex;
  padding: 2.5rem;
}

@media (max-width: 600px) {
  .user-info-block {
    flex-direction: column;
    align-items: center;
    padding: 2rem 2rem 1.67rem;
  }
}

@media (max-width: 960px) {
  .minor-area {
    display: none;
  }
}

.block {
  background-color: #fff;
  border-radius: 2px;
}

.shadow {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}

.major-area {
  flex: 1 1 auto;
  min-width: 0;
}

.user-view {
  display: flex;
  margin-bottom: 6rem;
}

.main-container > .view {
  margin-top: 1.767rem;
}

.container:after {
  display: table;
  content: "";
  clear: both;
}

.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  display: block;
}

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
