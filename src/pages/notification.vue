<template>
  <navbar-common></navbar-common>
  <div class="notification-type-choose">
    <a-row type="flex" style="width: 100%;">
      <a-col flex=".42"></a-col>
      <a-col flex="auto" class="notification-type-list">
        <router-link class="notification-type-item" :to="{ name: 'thumbRemind'}">
          <span>点赞通知</span>
          <a-badge :number-style="{ marginLeft: '5px' }" :count='remindUnreadCount["0"]'/>
        </router-link>
        <router-link
            class="notification-type-item"
            :to="{ name: 'commentRemind'}">
          <span>评论通知</span>
          <a-badge :number-style="{ marginLeft: '5px' }" :count='remindUnreadCount["1"]'/>
        </router-link>
        <!--        <router-link-->
        <!--            class="notification-type-item"-->
        <!--            :to="{ name: 'notificationList', params: { type: 'follow' } }"-->
        <!--        >-->
        <!--          <span>关注通知</span>-->
        <!--          <a-badge :number-style="{ marginLeft: '5px' }" :count='remindUnreadCount["2"]'/>-->
        <!--        </router-link>-->
        <!--        <router-link-->
        <!--            class="notification-type-item"-->
        <!--            :to="{ name: 'notificationList', params: { type: 'at' } }"-->
        <!--        >-->
        <!--          <span>@通知</span>-->
        <!--          <a-badge :number-style="{ marginLeft: '5px' }" :count='remindUnreadCount["3"]'/>-->
        <!--        </router-link>-->
        <!--        <router-link-->
        <!--            class="notification-type-item"-->
        <!--            :to="{ name: 'notificationList', params: { type: 'system' } }"-->
        <!--        >-->
        <!--          <span>系统通知</span>-->
        <!--          <a-badge :number-style="{ marginLeft: '5px' }" :count='remindUnreadCount["4"]'/>-->
        <!--        </router-link>-->
      </a-col>
    </a-row>
  </div>
  <div class="notification-container">
    <router-view></router-view>
  </div>
</template>

<script setup>

import NavbarCommon from "../components/common/NavbarCommon.vue";
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {queryNotificationNotReadCount, queryRemind} from "../api/notifiapi";
import {useStore} from "vuex";

const route = useRoute();
const store = useStore();

let myLoading = ref(true);
let remindUnreadCount = ref({
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0
})


watch(() => route.name, (nName, oName) => {
  queryNotificationNotReadCount().then(res => {
    remindUnreadCount.value = res.data.data
  })
  myLoading.value = true;
})

onMounted(() => {
  queryNotificationNotReadCount().then(res => {
    remindUnreadCount.value = res.data.data
  })
})

</script>

<style scoped lang="less">
.notification-container {
  position: relative;
  width: 100%;
  max-width: 780px;
  display: flex;
  flex-direction: column;
  margin: 10px auto 0;
}

.notification-type-choose {
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.notification-type-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
}

.notification-type-item {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  font-weight: 500;
  font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  border-bottom: 2px solid #ffffff;
}

.notification-type-item:not(:first-child) {
  margin-left: 40px;
}

.notification-type-item:hover {
  border-bottom: 2px solid #2b88d8;

  span {
    color: #2b88d8;
  }
}

.loading {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
}

.active {
  border-bottom: 2px solid #2b88d8;

  span {
    color: #2b88d8;
  }
}

a {
  color: #8a8886;
}
</style>
