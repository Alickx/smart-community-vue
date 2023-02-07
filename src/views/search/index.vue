<template>
  <main-layout left-width="30" right-width="30">
    <template #main>
      <div class="bg-white p-3">
        <search-post :post="post" v-for="post in queryResult" :key="post.id" />
      </div>
    </template>
  </main-layout>
</template>

<script setup lang="ts">
  import MainLayout from '/@/layout/mainLayout/index.vue';
  import { pageSearchKw } from '/@/api/search';
  import SearchPost from '/@/views/search/components/SearchPost/index.vue';
  import { searchPage } from '/@/api/search/types';

  const route = useRoute();
  let queryKeyword = ref('');
  let queryResult = ref<searchPage[]>([]);
  let total = ref(0);

  let pageParam = reactive({
    page: 1,
    size: 10,
  });

  const search = () => {
    pageSearchKw(queryKeyword.value, pageParam).then((resp) => {
      if (resp.code === 200) {
        total.value = resp.data.total;
        queryResult.value = resp.data.records;
      }
    });
  };

  onMounted(() => {
    queryKeyword.value = route.query.keyword as string;
    search();
  });
</script>

<style scoped></style>
