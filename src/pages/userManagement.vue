<template>
  <NavbarCommon></NavbarCommon>
  <div class="main-container">
    <div class="panel-container">
      <div class="left-panel">
        <ul style="background-color:#ffffff;height: 100%">
          <router-link
              v-slot="{ isActive }"
              :to="{ name: 'banManage' }">
            <li class="panel-item" :class="{ active:isActive }">
              <solution-outlined class="tw-mr-2 "/>
              封禁管理
            </li>
          </router-link>
          <li class="panel-item">
            <close-circle-outlined class="tw-mr-2 "/>
            文章删除管理
          </li>
        </ul>
      </div>
      <div class="input-form">
        <router-view></router-view>
      </div>
    </div>
  </div>


</template>

<script setup>
import NavbarCommon from "../components/common/NavbarCommon.vue";
import {
  ArrowLeftOutlined,
  SettingOutlined,
  SolutionOutlined,
  CloseCircleOutlined
} from '@ant-design/icons-vue'
import {useStore} from "vuex";


const store = useStore();


</script>

<style scoped>
.main-container {
  position: relative;
  margin: 0 auto 0;
  max-width: 1200px;
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

.active {
  background-color: #e8f3ff;
  color: #40a9ff;
}

.input-form {
  margin-left: 20px;
  background-color: #ffffff;
  margin-top: 15px;
  width: 100%;
}

.panel-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

</style>