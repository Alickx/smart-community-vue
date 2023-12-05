<template>
  <router-link :to="{ name: 'user-home', params: { id: userFollowVO.userProfile.userId } }" custom v-slot="{ href }">
    <a :href="href" target="_blank">
      <div class="flex flex-row space-between items-center p-3 space-x-5">
        <avatar :src="userFollowVO.userProfile.avatar" :size="45" />
        <span class="font-semibold text-lg">{{ userFollowVO.userProfile.nickName }}</span>
      </div>
    </a>
  </router-link>
</template>

<script lang="ts" setup>
  import { UserFollowVO } from '/@/api/user/types';
  import avatar from '/@/components/avatar/index.vue';

  defineProps<{
    userFollowVO: UserFollowVO;
  }>();
</script>

<style scoped></style>
