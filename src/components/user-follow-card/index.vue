<template>
  <div class="flex flex-row space-between items-center p-3 space-x-5">
    <avatar :src="userFollowVO.userProfile.avatar" :size="45" />
    <span class="font-semibold text-lg">{{ userFollowVO.userProfile.nickName }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { UserFollowVO } from '/@/api/user/types';
  import avatar from '/@/components/avatar/index.vue';

  defineProps<{
    userFollowVO: UserFollowVO;
  }>();
</script>

<style scoped></style>
