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
        <router-link :to="{ name: 'user',params:{ id: data.sender.uid }}" target="_blank">
          <a-avatar :size="59" :src="data.sender.avatar" alt="avatar"></a-avatar>
        </router-link>
        <div class="notification-info">
          <div class="notification-info-content ">
            <div class="notification-content">
              <div class="notification-type" v-if="data.actionType === notificationConstant.REMIND_COMMENT_ACTION_TYPE">
                <router-link
                    target="_blank"
                    style="color: #000;"
                    :to="{ name: 'user',params:{ id: data.sender.uid } }">
                  {{ data.sender.nickName }}
                </router-link>
                <span v-if="data.sourceType === notificationConstant.REMIND_SOURCE_COMMENT_TYPE">
                  评论了你的文章
                  <router-link :to="{ name: 'post',params:{ id: data.sourceUid } }" target="_blank">
                    {{ data.sourceTitle }}
                  </router-link>
                </span>
                <span v-else>
                  回复了你在文章
                  <router-link :to="{ name: 'post',params:{ id: data.sourceUid } }" target="_blank">
                    {{ data.sourceTitle }}
                  </router-link>
                  下的评论
                </span>
              </div>
              <router-link class="comment-content" :to="{ name: 'post',params:{ id: data.sourceUid } }" target="_blank">
                {{ data.sourceContent }}
              </router-link>
            </div>
            <span class="notification-meta">
            {{ formatTime(data.createdTime) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-m-12 tw-flex tw-justify-center tw-items-center">
      <a-pagination v-model:current="curPage" @change="pageChange" :total="totalCount" show-less-items />
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import {onMounted, ref, watch} from "vue";
import {queryRemind} from "../../api/notifiapi";
import {useRoute} from "vue-router";
import notificationConstant from "../../util/notificationConstant";

const route = useRoute();

const formatTime = (value) => {
  return dayjs(value).fromNow();
}

let loading = ref(false);
let notificationList = ref([]);
let curPage = ref(1);
let totalPage = ref(1);
let totalCount = ref(0);
let empty = ref(false);

const commentNotification = () => {
  empty.value = false;
  loading.value = true;
  const params = {
    curPage: curPage.value,
    sidx: 'created_time',
    order: 'desc',
    type: notificationConstant.REMIND_COMMENT_ACTION_TYPE
  }
  queryRemind(params).then(resp => {
    setTimeout(() => {
      if (resp.data.data.totalCount === 0) {
        empty.value = true;
      }
      notificationList.value = resp.data.data.list
      totalPage.value = resp.data.data.totalPage
      totalCount.value = resp.data.data.totalCount
      loading.value = false;
    }, 500)
  })
}

const pageChange = (page,pageSize)=>{
  const params = {
    curPage: page,
    sidx: 'created_time',
    order: 'desc',
    type: notificationConstant.REMIND_COMMENT_ACTION_TYPE
  }
  queryRemind(params).then(resp => {
    notificationList.value = resp.data.data.list
  })
}

onMounted(() => {
  commentNotification()
})



</script>

<style scoped lang="less">

.notification-contain {

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
        justify-content: center;
      }

      .notification-content {
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
        margin-top: 20px;
        font-size: 16px;
        color: #999;
        font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      }
    }
  }
}

.comment-content {
  padding: 10px;
  background: #fafbfc;
  border-radius: 3px;
  border: 1px solid #f1f1f2;
  font-size: 16px;
  font-weight: 500;
  font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  color: #999;
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
