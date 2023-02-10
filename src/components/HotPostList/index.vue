<template>
  <div class="bg-white w-full p-x-3">
    <div class="p-y-3">
      <span class="text-lg tracking-wider">24小时阅读排行榜</span>
    </div>
    <SplitLine />
    <ul class="flex flex-col p-x-2 p-y-1">
      <li class="p-y-2 flex flex-row items-center space-x-3" v-for="(item, index) in PostRankList" :key="item.postId">
        <span class="text-base color-[#545454]">{{ index + 1 }}</span>
        <router-link :to="{ name: 'PostView', params: { id: item.postId } }" custom v-slot="{ href }">
          <a :href="href" target="_black">
            <span class="line-clamp-1 text-sm color-[#545454] hover:color-[#1d7dfa]">
              {{ item.title }}
            </span>
          </a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import SplitLine from '../SplitLine/index.vue';
  import { queryTodayViewRank } from '/@/api/post';
  import { PostViewRankDTO } from '/@/api/post/types';

  let PostRankList = ref<PostViewRankDTO[]>([]);

  const queryRank = () => {
    queryTodayViewRank().then((res) => {
      if (res.code === 200) {
        PostRankList.value = res.data;
      }
    });
  };

  onMounted(() => {
    queryRank();
  });
</script>
