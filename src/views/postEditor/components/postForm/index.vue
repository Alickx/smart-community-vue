<template>
    <el-form :model="params">
        <el-form-item label="文章标题:">
            <el-input v-model="params.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章板块:">
            <el-select v-model="params.categoryId" placeholder="请选择板块">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="文章标签:">
            <el-select v-model="params.tagId" placeholder="请选择标签" no-data-text="暂无数据">
                <el-option v-for="item in tagList" :key="item.value" :label="item.name" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="是否公开:" class="!-m-b-0">
            <el-switch v-model="params.isPublish" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">import { getCategorySelect } from '/@/api/post';



const params = reactive({
    title: '',
    tagId: '',
    categoryId: '',
    isPublish: true,
})

const categoryList = ref<selectData[]>([])
const tagList = ref<selectData[]>([])

watch(() => params.categoryId, (newVal) => {
    categoryList.value.forEach(item => {
        if (item.value === newVal) {
            params.tagId = ''
            tagList.value = item.extendObj;
        }
    })
})



onMounted(() => {
    // 获取文章板块下拉列表及其标签
    getCategorySelect().then(resp => {
        categoryList.value = resp.data;
        if (categoryList.value.length > 0) {
            params.categoryId = categoryList.value[0].value;
        }
    })
})

defineExpose({
    params,
})



</script>
