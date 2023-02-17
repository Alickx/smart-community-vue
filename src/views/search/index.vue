<template>
  <main-layout>
    <template #main>
      <div class="bg-white p-3">
        <el-skeleton v-if="loading" :loading="loading" :rows="10" animated />
        <el-empty v-else-if="queryResult.length === 0" description="找不到结果噢" :image-size="300" :image="searchSvg" />
        <search-post v-else :post="post" v-for="post in queryResult" :key="post.id" />
      </div>
    </template>
  </main-layout>
</template>

<script setup lang="ts">
  import MainLayout from '/@/layout/main-layout/index.vue';
  import { pageSearchKw } from '/@/api/search';
  import SearchPost from '/@/views/search/components/search-post-list/index.vue';
  import { searchPage } from '/@/api/search/types';
  import useLoading from '/@/hooks/loading';
  import { useSearchStore } from '/@/store/modules/search';
  import searchSvg from '/@/assets/icons/svg/search-empty.svg';

  const route = useRoute();
  const router = useRouter();
  const searchStore = useSearchStore();
  let queryKeyword = ref('');
  let queryResult = ref<searchPage[]>([]);
  let total = ref(0);
  const { loading, toggle } = useLoading();

  let pageParam = reactive({
    page: 1,
    size: 10,
  });

  const search = () => {
    if (pageParam.page === 1) {
      toggle();
    }
    pageSearchKw(queryKeyword.value, pageParam).then((resp) => {
      if (resp.code === 200) {
        if (loading) {
          toggle();
        }
        total.value = resp.data.total;
        queryResult.value = resp.data.records;
      }
    });
  };

  // 监听store中的keyword变化
  watch(
    () => searchStore.keyword,
    (value) => {
      queryKeyword.value = value;
      // 更改当前页面的keyword
      router.replace({
        path: '/search',
        query: {
          keyword: value,
        },
      });
      search();
    },
  );

  onMounted(() => {
    queryKeyword.value = route.query.keyword as string;
    search();
  });
</script>

<style scoped></style>
