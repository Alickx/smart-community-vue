<template>
  <div class="antialiased bg-white Male text-slate-500 text-slate-400 bg-slate-900">
    <div
        class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 bg-transparent"
    >
      <div class="mx-auto max-w-8xl">
        <div class="px-4 py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 border-slate-300/10">
          <div class="relative flex items-center text-2xl sm:text-2xl font-blimone">
            <router-link to="/" class="mr-3 flex-none w-[2.0625rem] md:w-auto leading-6 text-black-200">
              智慧社区
            </router-link>
            <div class="text-sm font-semibold ml-8">
              <ul class="flex space-x-10">
                <li>
                  <router-link to="/" class="hover:text-sky-500 hover:text-sky-400">首页</router-link>
                </li>
              </ul>
            </div>
            <div class="relative items-center hidden ml-auto lg:flex">
              <nav class="text-sm font-semibold leading-6 text-slate-700 text-slate-200">
                <ul class="flex space-x-8">
                  <li v-if="!userStore.isLogin">
                    <router-link to="/login" class="hover:text-sky-500 hover:text-sky-400">登录 | 注册</router-link>
                  </li>
                  <li v-else>
                    <el-avatar :src="userStore.userProfile.avatar" class="cursor-pointer"
                               @click="handleClickAvatar"></el-avatar>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useUserStore} from "/@/store";

const userStore = useUserStore();
const handleClickAvatar = () => {
  console.log('点击头像')
}


</script>


<style lang="less">

</style>
