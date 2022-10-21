<template>
    <div>
        <div v-if="mode === 'horizontal'" class="border-b flex flex-row b-[#e5e6eb]"></div>
        <div v-else class="bg-[#e5e6eb] w-0.2 h-100%  float-left"></div>
    </div>
</template>

<script setup lang="ts">

/**
 * @description: 分割线组件
 * @param {String} mode 水平还是垂直
 * horizontal 水平
 * vertical 垂直
 */
const props = withDefaults(defineProps<{
    mode?: string
}>(), {
    mode: 'horizontal'
})



</script>
