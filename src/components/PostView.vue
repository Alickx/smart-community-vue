<template>
  <article class="post-item">
    <section class="post-item-body" v-for="(data, index) in 5">
      <a-typography>
        <a-typography-title type="primary" :level="4" :underline="true">
          <a-typography-link
            id="post-item-title"
            href="https://antdv.com"
            target="_blank"
          >idea的软件测试方法</a-typography-link>
        </a-typography-title>
        <a-typography-paragraph>
          <a-typography-text
            type="secondary"
          >Idea中的软件测试方法Idea中的软件测试方法Idea中的软件测试方法Idea中的软件测试方法Idea中的软件测试方法</a-typography-text>
        </a-typography-paragraph>
        <a-typography-text>
          <a href="https://www.baidu.com" class="post-meat-item">
            <user-outlined />痛苦的爱
          </a>
          <span class="post-meat-item">2016-05-02 12:31:05</span>
          <a href="javascript:void(0)" class="post-meat-item">
            <like-outlined />5
          </a>
          <a href="#" class="post-meat-item">
            <message-outlined />6
          </a>
          <a href="#" class="post-meat-item">
            <eye-outlined />6
          </a>
        </a-typography-text>
      </a-typography>
      <a-divider />
    </section>
  </article>
</template>

<script setup>
import {
  UserOutlined,
  LikeOutlined,
  MessageOutlined,
  EyeOutlined
} from '@ant-design/icons-vue';






</script>

<style scoped>
.post-item {
  padding-left: 25px;
  padding-right: 25px;
}

.post-item-body {
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#post-item-title:hover {
  color: #f60;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  text-decoration: none;
}

#post-item-title {
  /* font-weight: bold;
  font-size: 16px;
  color: #1d2129;
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; */
}

.post-meat-item {
  font-size: 14px;
  font-weight: 300;
  color: #000000;
}

.post-meat-item:not(:first-child) {
  margin-left: 15px;
}
</style>
