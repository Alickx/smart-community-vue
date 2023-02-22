<template>
  <div class="space-y-2">
    <div @click="onClickPush(post.id)" class="p-4 hover:bg-[#fafafa] rounded-2 hover:cursor-pointer flex flex-col space-y-4">
      <div class="flex flex-row space-x-7 font-medium text-base">
        <router-link custom :to="{ name: 'user-home', params: { id: post.authorId } }" v-slot="{ href }">
          <a :href="href" target="_black" class="hover:color-[#1d7dfa] text-base">{{ post.author?.nickName }}</a>
        </router-link>
        <split-line mode="vertical" />
        <a href="https://baidu.com/" target="_black" class="hover:color-[#1d7dfa] text-base">{{ post.categoryName }}</a>
        <split-line mode="vertical" />
        <el-tag>{{ post.tagName }}</el-tag>
      </div>
      <div class="flex flex-col justify-center space-y-4">
        <div class="text-xl color-[black] font-bold" v-html="highlightHandler(post.title)"></div>
        <p class="text-base color-[#86909c] line-clamp-2" v-html="highlightHandler(post.summary)"> </p>
      </div>
      <div class="flex flex-row flex-nowrap space-x-4 items-center">
        <div class="flex flex-row flex-nowrap items-center space-x-1">
          <SvgIcon name="svg-thumb" size="20px" />
          <span>{{ post.thumbCount }}</span>
        </div>
        <div class="flex flex-row flex-nowrap items-center space-x-1">
          <SvgIcon name="svg-comment" size="20px" />
          <span>{{ post.commentCount }}</span>
        </div>
        <span class="text-sm color-[#95a5a6]">{{ dateFormatDay(post.createTime) }}</span>
      </div>
    </div>
    <split-line />
  </div>
</template>

<script setup lang="ts">
  import { dateFormatDay } from '../../../../utils/DateFormatUtil';
  import SvgIcon from '/@/components/svg-icon/index.vue';
  import SplitLine from '/@/components/split-line/index.vue';
  import { searchPage } from '/@/api/search/types';

  defineProps<{
    post: searchPage;
  }>();

  /**
   * 点击跳转到文章详情页
   * @param id 文章id
   */
  const onClickPush = (id: string) => {
    window.open(`/post/${id}`, '_blank');
  };

  /**
   * 替换高亮文本中的<em>标签
   * @param text
   */
  const highlightHandler = (text: string) => {
    // 匹配<em>标签
    const reg = /<em>(.*?)<\/em>/g;
    // 替换
    return text.replace(reg, '<span style="color: red">$1</span>');
  };
</script>

<style scoped></style>
