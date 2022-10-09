<template>
    <div class="flex p-y-5 p-x-5 flex-col space-y-4 w-100% hover:bg-[#fafafa] hover:cursor-pointer">
        <div class="flex flex-row space-x-7">
            <a href="https://baidu.com/" targer="_black">Alickx</a>
            <a href="https://baidu.com/" targer="_black">后端</a>
            <el-tag>Java</el-tag>
            <!-- todo 用户信息 文章板块 -->
        </div>
        <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis rem quos fugit cumque iste, est maiores
                amet natus obcaecati rerum delectus ipsum eos laudantium reprehenderit aliquam deserunt odit ut quae
                sequi neque minima, explicabo optio accusantium. Pariatur ducimus dolorem soluta magnam tempora dicta,
                dignissimos perspiciatis quia facilis non commodi repudiandae?</p>
            <!-- todo 文章简略信息 -->
        </div>
        <div class="flex flex-row flex-nowrap space-x-4">
            <div class="flex flex-row flex-nowrap items-center space-x-1">
                <SvgIcon name="svg-thumb" color="black" size="small" />11
            </div>
            <div class="flex flex-row flex-nowrap items-center space-x-1">
                <SvgIcon name="svg-comment" color="black" size="small" />12
            </div>
            <span class="text-sm">发布时间为: 2022-10-10 29:30:45</span>
            <span class="text-sm">修改时间为: 2022-10-10 29:30:45</span>
            <!-- todo 点赞操作,评论数量和文章发布时间,文章标签 -->
        </div>

    </div>
</template>

<script setup lang="ts">
import SvgIcon from '../SvgIcon/index.vue';

</script>
