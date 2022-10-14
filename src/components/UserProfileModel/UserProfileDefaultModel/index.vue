<template>
    <div ref="avatarRef">
        <el-avatar
        size="default"
        @click="clickShowModel"
        class="cursor-pointer" :src="circleUrl" />
        <div class="flex flex-col h-auto w-70 absolute space-y-8 right-45 top-17 bg-[white] rounded-2 shadow-xl border-1 border-[#E3E5E7] p-y-3 p-x-4"
            v-if="showModel">
            <div class="flex flex-col items-center justify-center space-y-5 mt-10">
                <!-- 用户昵称 -->
                <span class="text-xl font-medium color-[gray]">李卤味同学仔</span>
                <!-- 等级条 -->
                <div class="flex flex-row justify-center items-center space-x-3">
                    <!-- 现有等级图标 -->
                    <svg-icon name="svg-level-1" color="red" size="20px" />
                    <!-- 进度条 -->
                    <div class="w-50 bg-[#f2f3f5] h-[0.17rem] rounded-1">
                        <div class="w-30% bg-red h-inherit rounded-1"></div>
                    </div>
                    <!-- 下一等级图标 -->
                    <svg-icon name="svg-level-2" size="20px" />
                </div>
            </div>
            <div class="flex flex-row items-center justify-center space-x-15">
                <!-- 关注 -->
                <div class="flex flex-col space-y-1 items-center justify-center">
                    <span class="text-base font-bold">690</span>
                    <span class="text-xs font-light color-[#9499A0]]">关注</span>
                </div>
                <!-- 粉丝 -->
                <div class="flex flex-col space-y-1 items-center justify-center">
                    <span class="text-base font-bold">690</span>
                    <span class="text-xs font-light color-[#9499A0]]">粉丝</span>
                </div>
                <!-- 文章数量 -->
                <div class="flex flex-col space-y-1 items-center justify-center">
                    <span class="text-base font-bold">690</span>
                    <span class="text-xs font-light color-[#9499A0]]">文章</span>
                </div>
            </div>
            <div class="flex flex-col">
                <!-- 导航菜单 -->
                <div class="flex flex-row p-y-3 cursor-pointer p-x-7 rounded-3 hover:bg-[#e3e5e7]" v-for="item in 3">
                    <div class="flex flex-1 flex-row space-x-3">
                        <svg-icon name="svg-user-profile" size="20px" />
                        <span class="">个人中心</span>
                    </div>
                    <svg-icon name="svg-right" size="20px" />
                </div>
                <splint-line class="p-y-3" />
                <!-- 注销 -->
                <div class="flex flex-row p-y-3 cursor-pointer p-x-7 rounded-3 hover:bg-[#e3e5e7]">
                    <div class="flex flex-1 flex-row space-x-3">
                        <svg-icon name="svg-user-profile" size="20px" />
                        <span class="">退出登录</span>
                    </div>
                    <svg-icon name="svg-right" size="20px" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from "../../SvgIcon/index.vue";
import SplintLine from "../../SplitLine/index.vue";
import { onClickOutside } from '@vueuse/core'

let circleUrl = 'https://img.llwstu.com/img/202208212352490.png'

let showModel = ref(false)
let avatarRef = ref();

onClickOutside(avatarRef, (event) => {
    console.log('click outside')
    showModel.value = false
})


const clickShowModel = () => {
    showModel.value = !showModel.value
}

</script>
