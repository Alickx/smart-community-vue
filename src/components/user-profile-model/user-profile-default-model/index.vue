<template>
  <div ref="avatarRef" class="relative">
    <avatar :size="40" @click="clickShowModel" class="cursor-pointer" :src="userStore.getUserProfile.avatar" />
    <div
      class="flex flex-col h-auto w-70 absolute space-y-8 right--32 top-13 bg-[white] rounded-2 shadow-xl border-1 border-[#E3E5E7] p-y-3 p-x-4"
      v-if="showModel"
    >
      <div class="flex flex-col items-center justify-center space-y-5 mt-2">
        <router-link :to="{ name: 'user-home', params: { id: userStore.userId } }">
          <Avatar :size="40" class="cursor-pointer" :src="userStore.getUserProfile.avatar" />
        </router-link>
        <!-- 用户昵称 -->
        <span class="text-xl font-medium">{{ userStore.getUserProfile.nickName }}</span>
      </div>
      <div class="flex flex-row items-center justify-center space-x-15">
        <!-- 关注 -->
        <router-link :to="{ name: 'user-home', params: { id: userStore.userId } }">
          <div class="flex flex-col space-y-1 items-center justify-center">
            <span class="text-base font-bold">{{ userStore.getUserProfile.followNum }}</span>
            <span class="text-xs font-light color-[#9499A0]]">关注</span>
          </div>
        </router-link>
        <!-- 粉丝 -->
        <router-link :to="{ name: 'user-home', params: { id: userStore.userId } }">
          <div class="flex flex-col space-y-1 items-center justify-center">
            <span class="text-base font-bold">{{ userStore.getUserProfile.fanNum }}</span>
            <span class="text-xs font-light color-[#9499A0]]">粉丝</span>
          </div>
        </router-link>
        <!-- 文章数量 -->
        <router-link :to="{ name: 'user-home', params: { id: userStore.userId } }">
          <div class="flex flex-col space-y-1 items-center justify-center">
            <span class="text-base font-bold">{{ userStore.getUserProfile.articleNum }}</span>
            <span class="text-xs font-light color-[#9499A0]]">文章</span>
          </div>
        </router-link>
      </div>
      <div class="flex flex-col">
        <!-- 导航菜单 -->
        <router-link :to="{ name: 'user-home', params: { id: userStore.userId } }">
          <div class="flex flex-row p-y-3 cursor-pointer p-x-7 rounded-3 hover:bg-[#e3e5e7]">
            <div class="flex flex-1 flex-row space-x-3">
              <svg-icon name="svg-user-profile" size="20px" />
              <span class="">个人中心</span>
            </div>
            <svg-icon name="svg-right" size="20px" />
          </div>
        </router-link>
        <router-link :to="{ name: 'user-setting-post' }">
          <div class="flex flex-row p-y-3 cursor-pointer p-x-7 rounded-3 hover:bg-[#e3e5e7]">
            <div class="flex flex-1 flex-row space-x-3">
              <svg-icon name="svg-article" size="20px" />
              <span class="">我的文章</span>
            </div>
            <svg-icon name="svg-right" size="20px" />
          </div>
        </router-link>
        <div class="flex flex-row p-y-3 cursor-pointer p-x-7 rounded-3 hover:bg-[#e3e5e7]">
          <div class="flex flex-1 flex-row space-x-3">
            <svg-icon name="svg-safe" size="20px" />
            <span class="">修改密码</span>
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
  import SvgIcon from '../../svg-icon/index.vue';
  import SplintLine from '../../split-line/index.vue';
  import { onClickOutside } from '@vueuse/core';
  import { useUserStore } from '/@/store';
  import Avatar from '/@/components/avatar/index.vue';
  import { getUserProfile } from '/@/api/user';

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

  // 调用用户查询接口
  const queryUserInfo = () => {
    getUserProfile().then((resp) => {
      userStore.setInfo(resp.data);
    });
  };

  const logout = () => {
    if (confirm('离开只为更好的归来')) {
      userStore.logout();
    }
  };

  onMounted(() => {
    queryUserInfo();
  });
</script>
