<template>
  <NavbarCommon></NavbarCommon>
  <main class="main-container">
    <div class="page-header">
      <router-link :to="{ name: 'user', params: { id: store.getters.getUserInfo.uid }}">
        <span>
          <arrow-left-outlined/>
          返回个人主页
        </span>
      </router-link>
    </div>
    <div class="panel-container">
      <div class="left-panel">
        <ul style="background-color:#ffffff;height: 100%">
          <li class="panel-item" @click="router.push({ name: 'userProfile' })">
            <solution-outlined/>
            用户信息
          </li>
          <li class="panel-item">
            <setting-outlined/>
            账号设置
          </li>
          <li class="panel-item">
            <close-circle-outlined/>
            屏蔽管理
          </li>
        </ul>
      </div>
      <div class="input-form">
        <router-view></router-view>
      </div>
    </div>
  </main>


</template>

<script setup>

import {useRouter} from "vue-router";
import NavbarCommon from "../components/common/NavbarCommon.vue";
import userStore from "../store/userStore";
import {
  ArrowLeftOutlined,
  SettingOutlined,
  SolutionOutlined,
  CloseCircleOutlined
} from '@ant-design/icons-vue'
import {onMounted} from "vue";


const router = useRouter();
const store = userStore;


onMounted(()=>{
  router.push({name: 'userProfile'})
})

</script>

<style scoped>

.main-container {
  position: relative;
  margin: 30px auto 0;
  max-width: 1200px;
}

.page-header {
  padding: 18px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}

.left-panel {
  box-sizing: border-box;
  margin-top: 15px;
  width: 230px;
  height: 620px;
}

.panel-item {
  color: #4e5969;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 5px;
  background-color: #ffffff;
}

.panel-item:hover {
  background-color: #e8f3ff;
  color: #40a9ff;
}

.input-form {
  margin-left: 20px;
  background-color: #ffffff;
  margin-top: 15px;
  width: 100%;
}

.panel-container{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}


</style>