<template>
  <nav class="flex flex-row z-50 p-y-4 p-x-10 bg-white">
    <div class="w-50 flex flex-row items-center space-x-2">
      <!-- logo -->
      <svg-icon name="svg-logo" size="40px" />
      <span class="text-lg font-bold">智慧社区</span>
    </div>
    <div class="flex items-center">
      <!-- 链接处 -->
      <ul class="space-x-8 flex flex-row items-center">
        <li><a href="#" class="text-gray-500 hover:text-gray-900">链接项</a></li>
        <li><a href="#" class="text-gray-500 hover:text-gray-900">链接项</a></li>
        <li><a href="#" class="text-gray-500 hover:text-gray-900">链接项</a></li>
        <li><a href="#" class="text-gray-500 hover:text-gray-900">链接项</a></li>
        <li><a href="#" class="text-gray-500 hover:text-gray-900">链接项</a></li>
        <li><a href="#" class="text-gray-500 hover:text-gray-900">链接项</a></li>
      </ul>
    </div>
    <form class="flex justify-center">
      <!-- 搜索栏 -->
      <div class="border-gray h-10 p-x-3 p-y-1 rounded-1 border-1 flex flex-row transition-width duration-300 ease-in-out" :class="searchInputWidth">
        <input type="text"
        @blur="handleSearchInputBlur"
        @focus="handleSearchInputFocus"
          class="border-none text-base font-medium w-[calc(100%-44px)] outline-none"
          placeholder="搜索点什么吧" />
        <div
          class="cursor-pointer bg-[#f2f3f5] w-10 flex items-center justify-center">
          <svg-icon name="svg-search" size="20px" />
        </div>
      </div>
    </form>
    <div class="">
      <!-- 工具栏 -->

    </div>
    <div class="">
      <!-- 用户信息模态框 -->
    </div>
  </nav>
</template>

<script setup lang="ts">
import SvgIcon from "../SvgIcon/index.vue";

let searchInputWidth = ref('search-input-blur')

const handleSearchInputFocus = () => {
  searchInputWidth.value = 'search-input-focus'
};

const handleSearchInputBlur = () => {
  searchInputWidth.value = 'search-input-blur'
};



</script>


<style lang="less">

.search-input-blur {
  width: 200px;
}

.search-input-focus {
  width: 400px;
  border: 1px solid blue;
}



</style>
