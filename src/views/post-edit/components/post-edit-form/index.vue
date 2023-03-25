<template>
  <el-form :model="params">
    <el-form-item label="文章标题:">
      <el-input v-model="params.title" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="文章板块:">
      <el-select v-model="params.categoryName" placeholder="请选择板块">
        <el-option v-for="item in categoryList" :key="item.value" :label="item.name" :value="item.name" />
      </el-select>
    </el-form-item>
    <el-form-item label="文章标签:">
      <el-select v-model="params.tagName" placeholder="请选择标签" no-data-text="暂无数据">
        <el-option v-for="item in tagList" :key="item.value" :label="item.name" :value="item.name" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否公开:" class="!-m-b-0">
      <el-switch v-model="params.isPublish" active-color="#13ce66" inactive-color="#ff4949" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { getCategorySelect } from '/@/api/post';
  import { SelectData } from '/@/types/result';

  const params = reactive({
    title: '',
    tagName: '',
    categoryName: '',
    isPublish: true,
  });

  const categoryList = ref<SelectData[]>([]);
  const tagList = ref<SelectData[]>([]);

  watch(
    () => params.categoryName,
    (newVal) => {
      categoryList.value.forEach((item) => {
        if (item.name === newVal) {
          params.tagName = '';
          tagList.value = item.attributes;
        }
      });
    },
  );

  onMounted(() => {
    // 获取文章板块下拉列表及其标签
    getCategorySelect().then((resp) => {
      if (resp.code === 200 && resp.data) {
        categoryList.value = resp.data;
      }
      if (categoryList.value.length > 0) {
        params.categoryName = categoryList.value[0].name;
      }
    });
  });

  defineExpose({
    params,
  });
</script>
