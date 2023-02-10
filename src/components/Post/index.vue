<template>
  <div @click="clickPush(post.id)" class="p-4 hover:bg-[#fafafa] rounded-2 hover:cursor-pointer flex flex-col space-y-2">
    <div class="flex flex-row space-x-3 font-medium text-base">
      <router-link custom :to="{ name: 'UserHome', params: { id: post.authorId } }" v-slot="{ href }">
        <a :href="href" target="_black" class="hover:color-[#1d7dfa] color-[#4e5969] text-[13px]">{{ post.author?.nickName }}</a>
      </router-link>
      <split-line mode="vertical" />
      <a href="https://baidu.com/" target="_black" class="hover:color-[#1d7dfa] color-[#4e5969] text-[13px]">{{ post.category.name }}</a>
      <split-line mode="vertical" />
      <a href="https://baidu.com/" target="_black" class="hover:color-[#1d7dfa] color-[#4e5969] text-[13px]">{{ post.tag.content }}</a>
    </div>
    <span class="text-base color-[black] font-bold">{{ post.title }}</span>
    <p class="text-sm color-[#86909c] line-clamp-1 p-r-5">
      {{ post.summary }}
    </p>
    <div class="flex flex-row flex-nowrap space-x-4 items-center">
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
      <span class="text-sm color-[#95a5a6]">{{ dateFormatDay(post.createTime) }}</span>
    </div>
  </div>
  <split-line />
</template>

<script setup lang="ts">
  import SvgIcon from '/@/components/SvgIcon/index.vue';
  import SplitLine from '../SplitLine/index.vue';
  import { cancelThumb, saveThumb } from '/@/api/post';
  import { dateFormatDay } from '/@/utils/DateFormatUtil';
  import { thumbType } from '/@/constant/ThumbType';
  import { useUserStore } from '/@/store';
  import { useDebounceFn } from '@vueuse/core';
  import { PostAbbreviationDTO } from '/@/api/post/types';

  const router = useRouter();
  const userStore = useUserStore();

  defineProps<{
    post: PostAbbreviationDTO;
  }>();
  const emit = defineEmits(['update:postList']);

  /**
   * 点击跳转到文章详情页
   * @param id 文章id
   */
  const clickPush = (id: string) => {
    window.open(`/post/${id}`, '_blank');
  };

  const thumbHandle = (id: string, thumbState: boolean) => {
    // 如果未登录，跳转到登录页面
    if (!userStore.getIsLogin) {
      router.push({
        name: 'Login',
      });
    }

    // 发起点赞请求并更新点赞状态
    debounceThumbHandle(id, thumbState);
  };

  const debounceThumbHandle = useDebounceFn((id: string, thumbState: boolean) => {
    if (!thumbState) {
      saveThumb(id, thumbType.POST);
      emit('update:postList', id, true);
    } else {
      cancelThumb(id, thumbType.POST);
      emit('update:postList', id, false);
    }
  }, 100);
</script>
