<template>
  <el-row :gutter="10" align="middle" class="z-9999 nav bg-white border-b-1 border-b-[#e3e5e7] flex items-center p-x-2 p-y-2">
    <el-col :span="6">
      <el-row align="middle">
        <el-col :offset="3">
          <router-link :to="{ name: 'home' }" class="flex flex-row items-center space-x-2">
            <!-- logo -->
            <svg-icon name="svg-logo" size="40px" />
            <span class="text-lg font-bold">智慧社区</span>
          </router-link>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8" />
    <el-col :span="6">
      <Search />
    </el-col>
    <el-col :span="4">
      <div class="space-x-11 flex flex-row items-center" v-if="userStore.getIsLogin">
        <!-- 工具栏和用户头像-->
        <UserProfileDefaultModel />
        <router-link :to="{ name: 'post-editor' }" v-slot="{ href }" custom>
          <a :href="href" target="_blank">
            <SvgIcon class="cursor-pointer" name="svg-pencil" size="25px" />
          </a>
        </router-link>
        <router-link :to="{ name: 'notice' }">
          <el-badge :max="99" :hidden="noticeStore.getNoticeCount === 0" :value="noticeStore.getNoticeCount">
            <SvgIcon class="cursor-pointer" name="svg-notice" size="25px" />
          </el-badge>
        </router-link>
      </div>
      <div class="flex flex-row items-center flex-gap-8" v-else>
        <RouterLink :to="{ name: 'login' }" class="text-gray-500 hover:text-gray-900">登录</RouterLink>
        <RouterLink :to="{ name: 'register' }" class="text-gray-500 hover:text-gray-900">注册</RouterLink>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
  import Search from './components/search-input/index.vue';
  import SvgIcon from '/@/components/svg-icon/index.vue';
  import UserProfileDefaultModel from '../user-profile-model/user-profile-default-model/index.vue';
  import { useUserStore } from '/@/store';
  import { queryNoticeCount } from '/@/api/notice';
  import { getIsLogin } from '/@/utils/AuthUtil';
  import { useNoticeStore } from '/@/store/modules/notice';

  const userStore = useUserStore();
  const noticeStore = useNoticeStore();

  const getNoticeCount = () => {
    if (getIsLogin()) {
      queryNoticeCount().then((res) => {
        if (res.code === 200 && res.data) {
          noticeStore.setNoticeCount(res.data);
        }
      });
    }
  };

  onMounted(() => {
    getNoticeCount();
  });
</script>

<style lang="less" scoped>
  .nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
</style>
