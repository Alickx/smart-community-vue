<template>
  <nav class="flex flex-row z-50 p-y-4 p-x-10 bg-white">
    <div class="w-50 flex flex-row items-center space-x-2">
      <!-- logo -->
      <svg-icon name="svg-logo" size="40px"/>
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
    <div class="flex justify-center ml-20 justify-space">
      <Search/>
      <div>
        <div class="">
          <!-- 工具栏 -->

        </div>
        <div class="">
          <!-- 用户信息模态框 -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Search from '../SearchInput/search.vue';
import SvgIcon from "../SvgIcon/index.vue";


</script>
