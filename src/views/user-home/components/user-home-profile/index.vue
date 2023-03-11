<template>
  <div class="flex flex-row p-4 justify-center space-x-10 bg-white min-h-30">
    <avatar :src="userProfile.avatar" :size="100" />
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
  import { UserProfileVO } from '/@/api/user/types';
  import { PropType } from 'vue';
  import Avatar from '/@/components/avatar/index.vue';

  const props = defineProps({
    userProfile: {
      type: Object as PropType<UserProfileVO>,
      required: true,
    },
  });
</script>
