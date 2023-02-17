<template>
  <div @click="clickPush(post.id, $event)" class="p-4 hover:bg-[#fafafa] rounded-2 hover:cursor-pointer flex flex-col space-y-2">
    <div class="flex flex-row space-x-3 font-medium text-base items-center">
      <router-link custom :to="{ name: 'user-home', params: { id: post.authorId } }" v-slot="{ href }">
        <a :href="href" target="_black" class="hover:color-[#1d7dfa] color-[#4e5969] text-[13px]">{{ post.author?.nickName }}</a>
      </router-link>
      <el-divider direction="vertical" />
      <router-link
        class="hover:color-[#1d7dfa] color-[#4e5969] text-[13px]"
        :to="{ name: 'home', params: { categoryName: post.category.name } }"
      >
        {{ post.category.name }}
      </router-link>
      <el-divider direction="vertical" />
      <router-link
        class="hover:color-[#1d7dfa] color-[#4e5969] text-[13px]"
        :to="{ name: 'home', params: { categoryName: post.category.name, tagName: post.tag.content } }"
      >
        {{ post.tag.content }}
      </router-link>
    </div>
    <span class="text-base color-[black] font-bold">{{ post.title }}</span>
    <p class="text-sm color-[#86909c] line-clamp-1 p-r-5">
      {{ post.summary }}
    </p>
    <div class="flex flex-row flex-nowrap space-x-4 items-center">
      <!--      工具栏-->
      <post-tool-list :post="post" />
      <span class="text-sm color-[#95a5a6]">{{ dateFormatDay(post.createTime) }}</span>
    </div>
  </div>
  <split-line />
</template>

<script setup lang="ts">
  import SplitLine from '/@/components/split-line/index.vue';
  import { dateFormatDay } from '/@/utils/DateFormatUtil';
  import { PostAbbreviationDTO } from '/@/api/post/types';
  import PostToolList from './components/post-tool-list/index.vue';

  defineProps<{
    post: PostAbbreviationDTO;
  }>();
  /**
   * 点击跳转到文章详情页
   * @param id 文章id
   * @param event 事件
   */
  const clickPush = (id: string, event) => {
    // 如果点击的是链接或者按钮，不跳转
    if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
      return;
    }
    window.open(`/post/${id}`, '_blank');
  };
</script>
