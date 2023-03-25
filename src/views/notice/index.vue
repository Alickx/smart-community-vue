<template>
  <main-layout>
    <template #main>
      <el-tabs :model-value="msgType" @tab-click="onClickTag">
        <el-tab-pane v-for="item in tabs" :key="item.value" :label="item.label" :name="item.value" />
      </el-tabs>
      <ul class="space-y-2">
        <div class="bg-white p-4 shadow rounded" v-if="notices.length === 0">
          <el-skeleton :loading="loading" :rows="3" />
        </div>
        <li v-for="notice in notices" :key="notice.id" class="bg-white p-4 shadow rounded">
          <notice-card :notice="notice" :msg-type="msgType" />
        </li>
      </ul>
    </template>
  </main-layout>
</template>

<script setup lang="ts">
  import mainLayout from '/@/layout/main-layout/index.vue';
  import noticeCard from '/@/views/notice/components/notice-card/index.vue';
  import { NoticeMessageVO } from '/@/api/notice/type';
  import { pageNotice } from '/@/api/notice';
  import useLoading from '/@/hooks/loading';
  import { TabsPaneContext } from 'element-plus';
  import { useDebounceFn } from '@vueuse/core';
  const { toggle, loading } = useLoading();

  let pageParams = reactive({
    page: 1,
    size: 10,
  });

  let total = ref(0);
  let notices = ref<NoticeMessageVO[]>([]);
  let msgType = ref(0);

  let tabs = [
    {
      label: '点赞',
      value: 0,
    },
    {
      label: '评论',
      value: 1,
    },
    {
      label: '关注',
      value: 2,
    },
  ];

  const getNotices = async () => {
    notices.value = [];

    if (pageParams.page === 1) {
      toggle();
    }
    const { code, data } = await pageNotice(msgType.value, pageParams);
    if (code === 200 && data) {
      notices.value = data.records;
      total.value = data.total;
      if (loading.value) {
        toggle();
      }
    }
  };

  const scrollLoad = useDebounceFn(() => {
    // 滑动到底部加载更多
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + clientHeight > scrollHeight - 50) {
      if (notices.value.length < total.value) {
        pageParams.page = pageParams.page + 1;
        getNotices();
      }
    }
  }, 500);

  const onClickTag = (pane: TabsPaneContext) => {
    msgType.value = pane.paneName as number;
  };

  watch(msgType, () => {
    getNotices();
  });

  onMounted(() => {
    getNotices();
    window.addEventListener('scroll', scrollLoad);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollLoad);
  });
</script>

<style scoped></style>
