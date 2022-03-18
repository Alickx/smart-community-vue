<template>
  <main class="main">
    <div v-for="(data,index) in postList" class="post-search-item">
      <router-link :to="{ name: 'post',params: { id: data.uid } }" target="_blank">
        <div class="author-info">
          <router-link :to="{ name:'user',params:{ id: data.authorInfo.uid } }" target="_blank"><span
              class="author-info-item nickName">{{ data.authorInfo.nickName }}</span>
          </router-link>
          <span class="author-info-item">{{ formatTime(data.createdTime) }}</span>
        </div>
        <div class="post-title">
          <router-link :to="{ name: 'post',params: { id: data.uid } }" target="_blank">
            <span class="title" v-html="data.title"></span>
          </router-link>
        </div>
        <div class="post-summary">
          <router-link :to="{ name: 'post',params: { id: data.uid } }" target="_blank">
            <span class="summary" v-html="data.summary"></span>
          </router-link>
        </div>
      </router-link>
      <div class="control-button">
        <a-button-group>
          <a-button v-if="!data.isLike" class="countNum" @click.stop="thumbClickHandle(data.uid,index)">
            <like-filled class="icon"/>
            <span>{{ data.thumbCount }}</span>
          </a-button>
          <a-button v-else class="countNum" @click.stop="thumbCancelHandle(data.uid,index)">
            <like-two-tone class="icon"/>
            <span class="isLike">{{ data.thumbCount }}</span>
          </a-button>
          <router-link :to="{ name: 'post',params:{ id: data.uid } }" target="_blank">
            <a-button class="countNum">
              <message-filled class="icon"/>
              {{ data.commentCount }}
            </a-button>
          </router-link>
        </a-button-group>
      </div>
    </div>
  </main>
</template>

<script setup>

import dayjs from "_dayjs@1.10.8@dayjs";
import {LikeFilled, MessageFilled, LikeTwoTone} from '@ant-design/icons-vue'
import "dayjs/locale/zh-cn";
import {thumbCancel, thumbSave} from "../../api/postapi";
import {reactive, toRefs} from "vue";

const props = defineProps({
  postList: {
    type: Array
  }
})

let params = reactive({
  toUid: ''
})

const {postList} = toRefs(props);


const thumbClickHandle = (value, index) => {
  params.toUid = value;
  thumbSave(params).then(resp => {
    if (resp.data.code === 0) {
      postList.value[index].thumbCount++;
      postList.value[index].isLike = true;
    }
  })
}

const thumbCancelHandle = (value, index) => {
  params.toUid = value;
  thumbCancel(params).then(resp => {
    if (resp.data.code === 0) {
      postList.value[index].thumbCount--;
      postList.value[index].isLike = false;
    }
  })
}

const formatTime = (time) => {
  return dayjs(time).toNow();
}


</script>

<style scoped>

.main {
  padding: 15px;
}

.author-info-item {
  color: #999999;
  font-size: 9px;
}

.author-info-item:not(:first-child) {
  margin-left: 5px;
}

.nickName {
  font-size: 13px;
}

.nickName:hover {
  color: #007fff;
}

.post-title {
  margin-top: 5px;
}

.title {
  font-size: 17px;
  color: #2e3135;
  font-weight: 700;
  line-height: 1.2rem;
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

.title:hover {
  border-bottom: 2px solid black;
}

.post-summary {
  margin-top: 3px;
}

.summary {
  font-size: 12px;
  color: #5b6169;
  line-height: 20px;
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

.control-button {
  margin-top: 10px;
}

.countNum {
  font-size: 10px;
  color: #b2bac2;
  font-weight: 700;
}

.post-search-item {
  padding: 25px;
}

.post-search-item:hover {
  background-color: #fcfcfc;
}

.icon {
  font-size: 12px;
}

.isLike {
  color: #1890ff;
}

</style>
