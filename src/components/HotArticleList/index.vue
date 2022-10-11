<template>
    <div class="bg-white w-80 p-x-3">
        <div class="p-y-3">
            <span class="text-lg tracking-wider">🔥最火文章榜</span>
        </div>
        <SplitLine />
        <ul class="flex flex-col p-x-2 p-y-1">
            <li class="p-y-2" v-for="i in 3">
                <a href="https://baidu.com/" targer="_black">
                    <span class="line-clamp-1 text-base color-[#545454] hover:color-[#1d7dfa]">依赖注入的多种方式</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import SplitLine from '../SplitLine/index.vue';

</script>
