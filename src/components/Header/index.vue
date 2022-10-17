<template>
  <div class="w-100% h-15 border-b-30 border-b-[#f4f5f5]"></div>
  <nav :class="navClass" class="lg:flex flex-row z-50 p-x-10 bg-[#fff] border-b-1 border-b-[#e3e5e7] h-15 w-100% ">
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
      </ul>
    </div>
    <div class="flex flex-1 justify-center items-center lg:justify-around h-100%">
      <Search/>
      <div class="lg:flex display-none">
        <div class="space-x-11 flex flex-row items-center" v-if="userStore.getIsLogin">
          <!-- 工具栏和用户头像-->
          <UserProfileDefaultModel/>
          <SvgIcon class="cursor-pointer" name="svg-pencil" size="25px"/>
          <SvgIcon class="cursor-pointer" name="svg-notice" size="25px"/>
        </div>
        <div class="flex flex-row items-center" v-else>
          <RouterLink :to="{ name: 'Login'}" class="text-gray-500 hover:text-gray-900 ">登录/注册</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Search from '../SearchInput/search.vue';
import SvgIcon from "../SvgIcon/index.vue";
import UserProfileDefaultModel from "../UserProfileModel/UserProfileDefaultModel/index.vue";
import { useUserStore } from '/@/store';


const userStore = useUserStore();

let navTop = ref(0);
let navShow = ref(true);

/**
 * 监听滚动事件
 */
watch(navTop,(newValue,oldValue)=>{
  if (newValue > 100) {
    if (newValue > oldValue) {
      navShow.value = false;
    } else {
      navShow.value = true;
    }
  }
});

const navClass = computed(() => {
  return navShow.value ? 'navOn' : 'navOff';
});


onMounted(()=>{
  window.addEventListener('scroll', () => {
    navTop.value = window.scrollY;
  });
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => {
    navTop.value = window.scrollY;
  });
})



</script>


<style lang="less" scoped>

  .navOn {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    transition: all 0.2s;
    transform: translate3d(0, 0, 0);
  }

  .navOff {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    transition: all 0.2s;
    transform: translate3d(0, -100%, 0);
  }


</style>
