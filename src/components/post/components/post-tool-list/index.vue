<template>
  <div class="flex flex-row flex-nowrap items-center space-x-1">
    <SvgIcon
      @click.stop="thumbHandle(post.id, post.expansion.isThumb)"
      name="svg-thumb"
      :color="post.expansion.isThumb ? 'blue' : 'black'"
      size="15px"
    />
    <span class="text-sm">{{ post.thumbCount }}</span>
  </div>
  <div class="flex flex-row flex-nowrap items-center space-x-1">
    <SvgIcon name="svg-comment" :color="post.expansion.isComment ? 'blue' : 'black'" size="15px" />
    <span class="text-sm">{{ post.commentCount }}</span>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '/@/components/svg-icon/index.vue';
  import { PostAbbreviationDTO } from '/@/api/post/types';
  import { useDebounceFn } from '@vueuse/core';
  import { cancelThumb, saveThumb } from '/@/api/post';
  import { thumbTypeEnum } from '/@/constant/ThumbTypeEnum';
  import { useUserStore } from '/@/store';

  const userStore = useUserStore();
  const router = useRouter();

  const props = defineProps<{
    post: PostAbbreviationDTO;
  }>();

  const post = toRef(props, 'post');

  const thumbHandle = (id: string, thumbState: boolean) => {
    // 如果未登录，跳转到登录页面
    if (!userStore.getIsLogin) {
      router.push({
        name: 'login',
      });
    }

    // 发起点赞请求并更新点赞状态
    debounceThumbHandle(id, thumbState);
  };

  const debounceThumbHandle = useDebounceFn((id: string, thumbState: boolean) => {
    if (!thumbState) {
      saveThumb(id, thumbTypeEnum.POST);
      updateThumb(id, thumbState);
    } else {
      cancelThumb(id, thumbTypeEnum.POST);
      updateThumb(id, thumbState);
    }
  }, 200);

  const updateThumb = (id: string, thumbState: boolean) => {
    if (!thumbState) {
      post.value.thumbCount++;
      post.value.expansion.isThumb = true;
    } else {
      post.value.thumbCount--;
      post.value.expansion.isThumb = false;
    }
  };
</script>