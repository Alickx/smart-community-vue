<template>
  <navbar-common></navbar-common>
  <div class="post-management-info">
    <span>文章管理中心</span>
  </div>
  <div class="post-management-container">
    <div v-if="loading">
      <a-skeleton/>
      <a-skeleton/>
      <a-skeleton/>
    </div>
    <div class="post-item-contain" v-else-if="postList.length > 0" v-for="(data, index) in postList" :key="index">
      <div class="post-item-container">
        <router-link
            custom
            v-slot="{ href }"
            :to="{ name: 'post',params: { id: data.uid } }">
          <a :href="href" target="_blank">
            <div class="post-title">
              <span>{{ data.title }}</span>
            </div>
          </a>
        </router-link>
        <div class="post-meta-info">
          <div class="post-meta-item">{{ formatTime(data.createdTime) }}</div>
          <div class="post-meta-item">点赞数 {{ data.thumbCount }}</div>
          <div class="post-meta-item">评论数 {{ data.commentCount }}</div>
          <div class="post-meta-item">收藏数 {{ data.collectCount }}</div>
        </div>
      </div>
      <div class="control-dropdown">
        <a-dropdown>
          <a-button>
            <small-dash-outlined/>
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <router-link :to="{ name: 'postEdit', params: { id: data.uid }}">编辑</router-link>
              </a-menu-item>
              <a-menu-item key="1">
                <a href="javascript:void(0)" @click.stop="postDelHandler(index)">删除</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div v-else>
      <a-empty description="您还没有发布过一篇文章呢"/>
    </div>
  </div>
</template>

<script setup>
import NavbarCommon from "../components/common/NavbarCommon.vue";
import {onMounted, ref} from "vue";
import {delPost, queryPostByMemberUid} from "../api/postapi";
import dayjs from "dayjs";
import {SmallDashOutlined} from '@ant-design/icons-vue'
import {message} from "ant-design-vue";
import {useStore} from "vuex";

const store = useStore();

const postList = ref([]);
let totalPages = ref(1);
let loading = ref(false);

const queryParams = {
  curPage: 1,
  sidx: 'created_time',
  order: 'desc',
  uid: store.getters.getUserInfo.uid
}

const formatTime = (value) => {
  return dayjs(value).format("YYYY-MM-DD HH:mm");
}

/**
 * 删除文章
 */
const postDelHandler = (index) => {
  let postUid = postList.value[index].uid
  console.log(postUid)
  delPost(postUid).then(resp => {
    if (resp.data.code === 0) {
      message.success("文章删除成功");
      postList.value = postList.value.filter((item) => {
        return item.uid !== postUid
      })
    }
  })

}

onMounted(() => {
  loading.value = true;
  queryPostByMemberUid(queryParams).then(resp => {
    postList.value = resp.data.data.list
    totalPages.value = resp.data.data.totalPage;
    setTimeout(() => {
      loading.value = false;
    }, 500)
  })
})


</script>

<style scoped>
.post-management-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  background-color: #efefef;
}

.post-management-info span {
  font-size: 25px;
  font-weight: 200;
  font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  letter-spacing: 10px;
}

.post-management-container {
  position: relative;
  margin: 30px auto 0;
  max-width: 800px;
  background-color: #ffffff;
  padding: 20px;
}

.post-item-contain {
  display: flex;
  flex-direction: row;
}

.post-item-container {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.post-item-contain:not(:first-child) {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.post-item-contain:hover {
  background-color: #fcfcfc;
}

.control-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.post-title {
  color: #201f1e;
  font-size: 18px;
  font-weight: 560;
  font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

.post-meta-info {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.post-meta-item {
  font-size: 16px;
  font-weight: 400;
  font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  color: #8a8886;
}

.post-meta-item:not(:first-child) {
  margin-left: 20px;
}
</style>
