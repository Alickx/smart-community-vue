<template>
  <div class="post-list-contain">
    <div class="post-list-container" v-for="(data, index) in postItemList">
      <router-link :to="{ name: 'post', params: { id: data.uid } }" target="_blank">
        <div class="post-title">
          <router-link
            class="title"
            target="_blank"
            :to="{ name: 'post', params: { id: data.uid } }"
          >{{ data.title }}</router-link>
        </div>
        <div class="post-view-content">
          <div class="member-avatar">
            <a-avatar class="avatar" shape="square" :src="data.authorInfo.avatar" :size="58"></a-avatar>
          </div>
          <div class="post-summary">
            <span class="summary">{{ data.summary }}</span>
          </div>
        </div>
      </router-link>
      <div class="post-view-foot">
        <div class="post-info">
          <router-link
            class="post-info-meta"
            target="_blank"
            :to="{ name: 'user', params: { id: data.authorInfo.uid } }"
          >{{ data.authorInfo.nickName }}</router-link>
          <span class="post-info-meta">{{ timeFormat(data.createdTime) }}</span>
        </div>
        <div class="control-button-group">
          <div class="control-button-item tw-flex tw-justify-center tw-items-center">
            <like-outlined
              class="icon tw-cursor-pointer tw-mr-1"
              v-if="!data.isLike"
              @click.stop="thumbClickHandle(data, index)"
            />
            <like-filled v-else class="icon tw-cursor-pointer tw-mr-1" @click.stop="thumbCancelHandle(data, index)"></like-filled>
            {{ data.thumbCount }}
          </div>
          <div class="control-button-item">
            <router-link class="tw-flex tw-justify-center tw-items-center" style="color: black;" target="_blank" :to="{ name: 'post', params: { id: data.uid } }">
              <message-outlined class="icon tw-cursor-pointer tw-mr-1" />
              {{ data.commentCount }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  UserOutlined,
  LikeOutlined,
  MessageOutlined,
  EyeOutlined,
  LikeFilled
} from '@ant-design/icons-vue';
import dayjs from "dayjs";
import { thumbCancel, thumbSave } from "../../api/postapi";
import { onDeactivated, onMounted, reactive, toRef, toRefs } from "vue";
import thumbConstant from "../../util/thumbConstant";

const props = defineProps({
  postItemList: {
    type: Array
  }
});


const { postItemList } = toRefs(props);

const thumbClickHandle = (data, index) => {
  const params = {
    toMemberUid: data.authorInfo.uid,
    toUid: data.uid,
    postUid: data.uid,
    type: thumbConstant.THUMB_POST_TYPE
  }

  thumbSave(params).then(resp => {
    if (resp.data.code === 0) {
      postItemList.value[index].thumbCount++;
      postItemList.value[index].isLike = true;
    }
  })
}

const thumbCancelHandle = (data, index) => {
  const params = {
    toMemberUid: data.authorInfo.uid,
    toUid: data.uid,
    postUid: data.uid,
    type: thumbConstant.THUMB_POST_TYPE
  }

  thumbCancel(params).then(resp => {
    if (resp.data.code === 0) {
      postItemList.value[index].thumbCount--;
      postItemList.value[index].isLike = false;
    }
  })
}


const timeFormat = (value) => {
  return dayjs(value).toNow();
}


</script>

<style scoped>
.post-list-contain {
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.post-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
}

.post-list-container:not(:first-child) {
  margin-top: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.post-list-container:hover {
  background-color: #fcfcfc;
}

.post-info-meta {
  color: #999999;
  font-size: 16px;
}

.post-info-meta:not(:first-child) {
  margin-left: 15px;
}

.post-title {
  margin-top: 5px;
}

.title {
  font-size: 18px;
  color: #5b6169;
  font-weight: 600;
  line-height: 1.2rem;
  font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

.member-avatar {
  display: flex;
  align-items: center;
}

.avatar {
  float: left;
  padding: 2px;
  border: 1px solid #999999;
}

.post-summary {
  margin-left: 20px;
}
.summary {
  font-size: 16px;
  color: #5b6169;
  line-height: 30px;
}

.post-view-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
}

.post-view-foot {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  align-items: center;
}

.control-button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 20px;
}

.control-button-item:not(:first-child) {
  margin-left: 20px;
}

.icon {
  font-size: 16px;
}
</style>
