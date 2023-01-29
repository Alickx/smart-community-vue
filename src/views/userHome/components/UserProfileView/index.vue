<template>
  <div class="flex flex-row p-4 justify-center space-x-10 bg-white min-h-30">
    <Avatar :src="userProfile.avatar" size="6" />
    <div class="flex-1 flex flex-col space-y-3">
      <span class="font-semibold text-xl">{{ userProfile.nickName }}</span>
      <p class="text-normal color-gray">{{ userProfile.intro }}</p>
    </div>
    <div class="items-end flex">
      <el-button size="large" type="primary" plain>编辑资料</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { UserProfileDTO } from '/@/api/user/types';
  import { PropType } from 'vue';
  import Avatar from '/@/components/Avatar/index.vue';

  const props = defineProps({
    userProfile: {
      type: Object as PropType<UserProfileDTO>,
      required: true,
    },
  });
</script>
