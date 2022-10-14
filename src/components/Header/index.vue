<template>
  <nav class="lg:flex flex-row z-50 p-y-4 p-x-10 bg-[#fff]">
    <div class="display-none w-50 xl:flex xl:flex-row items-center space-x-2">
      <!-- logo -->
      <svg-icon name="svg-logo" size="40px"/>
      <span class="text-lg font-bold">智慧社区</span>
    </div>
    <div class="lg:flex items-center display-none">
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
    <div class="flex flex-1 justify-center items-center lg:justify-around">
      <Search/>
      <div class="lg:flex display-none">
        <div class="space-x-11 flex flex-row items-center">
          <!-- 工具栏和用户头像-->
          <UserProfileDefaultModel/>
          <SvgIcon class="cursor-pointer" name="svg-pencil" size="25px"/>
          <SvgIcon class="cursor-pointer" name="svg-notice" size="25px"/>
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
import UserProfileDefaultModel from "../UserProfileModel/UserProfileDefaultModel/index.vue";




</script>
