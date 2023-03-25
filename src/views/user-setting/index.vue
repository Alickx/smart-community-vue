<template>
  <main-layout :left-width="15" :right-width="5">
    <template #left>
      <el-menu default-active="/user/setting/profile" router @select="handleSelect" class="el-menu-setting h-90%">
        <el-menu-item v-for="item in menu" :key="item.index" :index="item.index">{{ item.label }}</el-menu-item>
      </el-menu>
    </template>
    <template #main>
      <div class="w-full rounded bg-white h-90%">
        <div class="p-5">
          <el-breadcrumb class="mt-3 mb-7" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
            <el-breadcrumb-item>{{ menuLabelComputed }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view />
        </div>
      </div>
    </template>
  </main-layout>
</template>

<script lang="ts" setup>
  import MainLayout from '/@/layout/main-layout/index.vue';

  const router = useRouter();
  const route = useRoute();
  const menu = [
    {
      index: '/user/setting/profile',
      label: '基本信息',
    },
    {
      index: '/user/setting/post',
      label: '文章管理',
    },
    {
      index: '/user/setting/follow',
      label: '关注管理',
    },
  ];

  let activeIndex = ref(route.path);

  const handleSelect = (index: string) => {
    activeIndex.value = index;
  };

  const menuLabelComputed = computed(() => {
    return menu.find((item) => item.index === activeIndex.value)?.label;
  });
</script>

<style scoped>
  .el-menu-setting {
    width: 100%;
  }
</style>
