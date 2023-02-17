<template>
  <!-- 搜索栏 -->
  <div
    :class="{ active: isInputFocus }"
    class="xl:w-60 w-50 border-gray h-7 p-x-3 p-y-1 rounded-1 border-1 flex flex-row transition-width duration-300 ease-in-out"
  >
    <input
      type="text"
      v-model="searchContent"
      ref="inputRef"
      class="border-none text-base font-medium w-[calc(100%-44px)] outline-none"
      placeholder="搜索点什么吧"
    />
    <div :class="searchIconContain" @click="pushSearch" class="cursor-pointer w-10 flex items-center justify-center">
      <svg-icon :color="searchIconColor" name="svg-search" size="20px" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '../../../svg-icon/index.vue';
  import { useSearchStore } from '/@/store/modules/search';

  const router = useRouter();
  const route = useRoute();
  const searchStore = useSearchStore();
  let searchContent = ref('');
  let inputRef = ref();
  let isInputFocus = ref(false);

  const searchIconColor = computed(() => {
    return isInputFocus.value ? '#1890ff' : '';
  });

  const searchIconContain = computed(() => {
    return isInputFocus.value ? 'bg-[#eaf2ff]' : 'bg-[#f2f3f5]';
  });

  function pushSearch() {
    if (router.currentRoute.value.name === 'search') {
      searchStore.setKeyword(searchContent.value);
    } else {
      router.push({
        path: '/search',
        query: {
          keyword: searchContent.value,
        },
      });
    }
  }

  watch(isInputFocus, (val) => {
    if (val === true) {
      inputRef.value.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          pushSearch();
        }
      });
    } else {
      inputRef.value.removeEventListener('keyup', () => {});
    }
  });

  onMounted(() => {
    inputRef.value.addEventListener('focus', () => {
      isInputFocus.value = true;
    });
    inputRef.value.addEventListener('blur', () => {
      if (searchContent.value === '') {
        isInputFocus.value = false;
      }
    });

    if (route.query.keyword) {
      searchContent.value = route.query.keyword as string;
    }
  });

  onBeforeUnmount(() => {
    inputRef.value.removeEventListener('focus', () => {
      isInputFocus.value = true;
    });
    inputRef.value.removeEventListener('blur', () => {
      isInputFocus.value = false;
    });
  });

  router.beforeResolve((to, from, next) => {
    if (to.name !== 'search') {
      isInputFocus.value = false;
      searchContent.value = '';
      next();
    } else {
      next();
    }
  });
</script>

<style lang="less" scoped>
  .active {
    border-color: #1890ff;
  }
</style>
