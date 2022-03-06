<template>
  <div class="post-container">
    <div class="title">
      <a-typography-title :level="3">
        {{ postInfo.title }}
      </a-typography-title>
    </div>
    <div class="user-info">
      <a-row align="middle">
        <a-col :span="22">
          <div class="author-info">
            <div class="avatar" style="display: flex;align-items: center">
              <a-avatar size="large" :src="postInfo.authorInfo.avatar"/>
            </div>
            <div class="author-info-item">
              <div class="nick-name">
                <span>{{ postInfo.authorInfo.nickName }}</span>
              </div>
              <div class="post-time">
                {{ timeFormat(postInfo.createdTime) }}
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="2">
          <div class="follow-button">
            <a-button type="primary" size="large">关注</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="post-content">
      <v-md-editor :model-value="postInfo.content" mode="preview"></v-md-editor>
    </div>
  </div>
</template>

<script setup>

import dayjs from "_dayjs@1.10.8@dayjs";

const props = defineProps({
  'postInfo': {
    type: Object
  }
})

const timeFormat = (value) => {
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
}


</script>

<style scoped>

.post-container {
  width: 100%;

}

.author-info {
  display: flex;
  flex-direction: row;
}

.author-info-item {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}

.nick-name {

}

.user-info {
  margin-top: 35px;
}

.post-content {
  margin-top: 50px;
}


</style>