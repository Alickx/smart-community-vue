<template>
    <div class="flex p-3 flex-col space-y-4 hover:bg-[#fafafa] hover:cursor-pointer rounded-2">
        <div class="flex flex-row space-x-7 font-medium text-base">
            <a href="https://baidu.com/" targer="_black" class="hover:color-[#1d7dfa]">Alickx</a>
            <a href="https://baidu.com/" targer="_black" class="hover:color-[#1d7dfa]">后端</a>
            <el-tag>Java</el-tag>
            <!-- todo 用户信息 文章板块 -->
        </div>
        <div class="flex flex-col justify-center space-y-4">
            <span class="text-xl color-[black] font-bold">依赖注入的多种方式</span>
            <p class="text-base color-[#86909c] line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis rem quos fugit cumque iste, est maiores
                amet natus obcaecati rerum delectus ipsum eos laudantium reprehenderit aliquam deserunt odit ut quae
                sequi neque minima, explicabo optio accusantium. Pariatur ducimus dolorem soluta magnam tempora dicta,
                dignissimos perspiciatis quia facilis non commodi repudiandae?
            </p>
            <!-- todo 文章简略信息 -->
        </div>
        <div class="flex flex-row flex-nowrap space-x-4 items-center">
            <div class="flex flex-row flex-nowrap items-center space-x-1">
                <SvgIcon name="svg-thumb" color="black" size="20px" />
                <span>11</span>
            </div>
            <div class="flex flex-row flex-nowrap items-center space-x-1">
                <SvgIcon name="svg-comment" color="black" size="20px" />
                <span>12</span>
            </div>
            <span class="text-sm color-[#95a5a6]">3天前</span>
            <!-- todo 点赞操作,评论数量和文章发布时间,文章标签 -->
        </div>
    </div>
    <SplitLine />
</template>

<script setup lang="ts">
import SvgIcon from '../SvgIcon/index.vue';
import SplitLine from '../SplitLine/index.vue';

</script>
