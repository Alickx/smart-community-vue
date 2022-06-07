<template>
  <div class="tw-p-5 tw-flex tw-flex-row tw-flex-wrap tw-justify-start tw-items-center">
    <div class="tw-flex tw-flex-row tw-items-center tw-p-5">
      <span>搜索内容：</span>
      <a-row :guttter="25">
        <a-col :span="25">
          <a-input v-model:value="searchValue" />
        </a-col>
      </a-row>
    </div>
    <div class="tw-p-5">
      <span>搜索类型：</span>
      <a-select
          v-model:value="searchType"
          style="width: 120px"
          @change=""
      >
        <a-select-option value="1">用户名</a-select-option>
        <a-select-option value="2">用户ID</a-select-option>
      </a-select>
    </div>
    <div class="tw-p-5">
      <span>封禁时间范围：</span>
      <a-range-picker v-model:value="searchTime" />
    </div>
    <div class="tw-p-5">
      <a-button type="primary" @click="search">搜索</a-button>
      <a-button class="tw-ml-5" type="default">重置</a-button>
    </div>
  </div>
<!--  <div>-->
<!--    <a-divider />-->
<!--  </div>-->
</template>

<script setup>
import {reactive, ref} from "vue";

let searchValue = ref('');
let searchType = ref('');
let searchTime = ref('');

const emit = defineEmits([
    "searchEmit"
])

const search = ()=>{
  // 兄弟组件通信
  emit('searchEmit',{
    searchValue: searchValue.value,
    searchType: searchType.value,
    searchTime: searchTime.value
  });
}


</script>

<style scoped>



</style>