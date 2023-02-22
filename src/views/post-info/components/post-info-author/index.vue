<template>
  <div class="flex flex-row items-center space-x-3">
    <div>
      <!-- 头像 -->
      <Avatar :src="props.postInfo.author.avatar" size="2" />
    </div>
    <div>
      <!-- 作者名 -->
      <span class="cursor-pointer hover:underline font-bold text-base color-[#00965e]">{{ props.postInfo.author.nickName }}</span>
      <!-- 等级 -->
    </div>
    <div class="space-x-3">
      <span class="text-sm font-bold color-gray-500">发布于 {{ dateFormatDay(props.postInfo.createTime) }} </span>
      <span class="text-sm font-bold color-gray-500">{{ props.postInfo?.region }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PostInfoDTO } from '/@/api/post/types';
  import { dateFormatDay } from '../../../../utils/DateFormatUtil';
  import Avatar from '/@/components/avatar/index.vue';

  const props = defineProps<{
    postInfo: PostInfoDTO;
  }>();
</script>
