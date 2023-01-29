<template>
  <div ref="avatarRef" class="relative">
    <el-avatar size="default" @click="clickShowModel" class="cursor-pointer" :src="userStore.getUserProfile.avatar" />
    <div
      class="flex flex-col h-auto w-70 absolute space-y-8 right--32 top-13 bg-[white] rounded-2 shadow-xl border-1 border-[#E3E5E7] p-y-3 p-x-4"
      v-if="showModel"
    >
      <div class="flex flex-col items-center justify-center space-y-5 mt-2">
        <router-link :to="{ name: 'UserHome', params: { id: userStore.userId } }">
          <Avatar size="5" class="cursor-pointer" :src="userStore.getUserProfile.avatar" />
        </router-link>
        <!-- 用户昵称 -->
        <span class="text-xl font-medium">{{ userStore.getUserProfile.nickName }}</span>
        <!-- 等级条 -->
        <div class="flex flex-row justify-center items-center space-x-3">
          <!-- 现有等级图标 -->
          <svg-icon name="svg-level-1" color="red" size="25px" />
          <!-- 进度条 -->
          <div class="w-50 bg-[#f2f3f5] h-[0.17rem] rounded-1">
            <div class="w-30% bg-red h-inherit rounded-1"></div>
          </div>
          <!-- 下一等级图标 -->
          <svg-icon name="svg-level-2" size="25px" />
        </div>
      </div>
      <div class="flex flex-row items-center justify-center space-x-15">
        <!-- 关注 -->
        <div class="flex flex-col space-y-1 items-center justify-center">
          <span class="text-base font-bold">{{ userStore.getUserProfile.followNum }}</span>
          <span class="text-xs font-light color-[#9499A0]]">关注</span>
        </div>
        <!-- 粉丝 -->
        <div class="flex flex-col space-y-1 items-center justify-center">
          <span class="text-base font-bold">{{ userStore.getUserProfile.fanNum }}</span>
          <span class="text-xs font-light color-[#9499A0]]">粉丝</span>
        </div>
        <!-- 文章数量 -->
        <div class="flex flex-col space-y-1 items-center justify-center">
          <span class="text-base font-bold">690</span>
          <span class="text-xs font-light color-[#9499A0]]">文章</span>
        </div>
      </div>
      <div class="flex flex-col">
        <!-- 导航菜单 -->
        <div class="flex flex-row p-y-3 cursor-pointer p-x-7 rounded-3 hover:bg-[#e3e5e7]">
          <div class="flex flex-1 flex-row space-x-3">
            <svg-icon name="svg-user-profile" size="20px" />
            <span class="">个人中心</span>
          </div>
          <svg-icon name="svg-right" size="20px" />
        </div>
        <div class="flex flex-row p-y-3 cursor-pointer p-x-7 rounded-3 hover:bg-[#e3e5e7]">
          <div class="flex flex-1 flex-row space-x-3">
            <svg-icon name="svg-article" size="20px" />
            <span class="">我的文章</span>
          </div>
          <svg-icon name="svg-right" size="20px" />
        </div>
        <div class="flex flex-row p-y-3 cursor-pointer p-x-7 rounded-3 hover:bg-[#e3e5e7]">
          <div class="flex flex-1 flex-row space-x-3">
            <svg-icon name="svg-safe" size="20px" />
            <span class="">安全中心</span>
          </div>
          <svg-icon name="svg-right" size="20px" />
        </div>
        <splint-line class="p-y-3" />
        <!-- 注销 -->
        <div @click="logout" class="flex flex-row p-y-3 cursor-pointer p-x-7 rounded-3 hover:bg-[#e3e5e7]">
          <div class="flex flex-1 flex-row space-x-3">
            <svg-icon name="svg-logout" size="20px" />
            <span class="">退出登录</span>
          </div>
          <svg-icon name="svg-right" size="20px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '../../SvgIcon/index.vue';
  import SplintLine from '../../SplitLine/index.vue';
  import { onClickOutside } from '@vueuse/core';
  import { useUserStore } from '/@/store';
  import Avatar from '/@/components/Avatar/index.vue';

  let showModel = ref(false);
  let avatarRef = ref();

  const userStore = useUserStore();

  // 点击模态框外部关闭模态框
  onClickOutside(avatarRef, () => {
    showModel.value = false;
  });

  const clickShowModel = () => {
    showModel.value = !showModel.value;
  };

  const logout = () => {
    if (confirm('离开只为更好的归来')) {
      userStore.logout();
    }
  };
</script>
