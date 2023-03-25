<template>
  <div class="flex flex-row items-center mt-5 space-x-5">
    <!-- 头像 -->
    <Avatar :src="props.postInfo.author.avatar" :size="50" />
    <div class="flex flex-col space-y-2">
      <!-- 作者名 -->
      <span class="cursor-pointer hover:underline font-bold text-base color-[#515767]">{{ props.postInfo.author.nickName }}</span>
      <div class="flex flex-row">
        <span class="text-sm font-bold color-gray-500">{{ props.postInfo.createTime }} </span>
        <span class="text-sm font-bold color-gray-500">{{ props.postInfo?.region }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PostInfoVO } from '/@/api/post/types';
  import Avatar from '/@/components/avatar/index.vue';

  const props = defineProps<{
    postInfo: PostInfoVO;
  }>();
</script>
