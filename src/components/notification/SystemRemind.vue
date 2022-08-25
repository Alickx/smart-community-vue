<template>
  <div class="notification-contain">
    <div v-if="loading" class="loading">
      <a-skeleton :active="true"></a-skeleton>
    </div>
    <div class="loading" :class="{ 'hide' : !empty }">
      <a-empty description="您没有收到任何通知噢"></a-empty>
    </div>
    <div class="notification-item" v-for="(data,index) in notificationList">
      <div class="notification-container">
        <div class="notification-info">
          <div class="notification-info-content ">
            <div class="notification-content">
              <div class="notification-type"
                   v-if="data.actionType === notificationConstant.REMIND_SYSTEM_ACTION_TYPE">
                <span>
                  {{ data.sourceContent }}
                </span>
              </div>
            </div>
            <span class="notification-meta">
            {{ formatTime(data.createdTime) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-m-12 tw-flex tw-justify-center tw-items-center">
      <a-pagination v-model:current="curPage" @change="pageChange" :total="totalCount" show-less-items/>
    </div>
  </div>
</template>

<script setup>
import notificationConstant from "../../util/notificationConstant";
import dayjs from "dayjs";
import {queryRemind} from "../../api/notifiapi";
import {onMounted, ref} from "vue";
import {watch} from "vue";

let curPage = ref(1);
let totalPage = ref(1);
let totalCount = ref(0);
let notificationList = ref([]);
let loading = ref(false);
let empty = ref(false);

const systemNotification = () => {
  empty.value = false;
  const params = {
    curPage: 1,
    sidx: 'created_time',
    order: 'desc',
    type: notificationConstant.REMIND_SYSTEM_ACTION_TYPE
  }
  queryRemind(params).then(resp => {
    loading.value = true;
    setTimeout(() => {
      if (resp.data.data.totalCount === 0) {
        empty.value = true;
      }
      notificationList.value = resp.data.data.list
      totalPage.value = resp.data.data.totalPage
      totalCount.value = resp.data.data.totalCount
      loading.value = false
    }, 500)
  })
}

const pageChange = (page, pageSize) => {
  const params = {
    curPage: page,
    sidx: 'created_time',
    order: 'desc',
    type: notificationConstant.REMIND_SYSTEM_ACTION_TYPE
  }
  queryRemind(params).then(resp => {
    notificationList.value = resp.data.data.list
  })
}


const formatTime = (value) => {
  return dayjs(value).fromNow();
}

onMounted(() => {
  systemNotification()
})

</script>

<style scoped lang="less">
.notification-item {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;

  &:not(:first-child) {
    margin-top: 10px;
  }

  .notification-container {
    display: flex;
    flex-direction: row;
  }

  .notification-info {
    margin-left: 20px;
    flex: auto;

    .notification-info-content {
      display: flex;
      flex-direction: column;
    }

    .notification-type {
      margin-left: 5px;
      font-size: 16px;
      font-weight: 500;
      font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }

    .notification-meta {
      margin-top: 10px;
      font-size: 16px;
      color: #999;
      font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    }
  }
}

.loading {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
}

.hide {
  display: none;
}
</style>
