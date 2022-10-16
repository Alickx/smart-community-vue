<template>
    <el-form :model="params">
        <el-form-item label="文章标题:">
            <el-input v-model="params.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章板块:">
            <el-select v-model="params.category" placeholder="请选择板块">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="文章标签:">

        </el-form-item>
        <el-form-item label="是否公开:" class="!-m-b-0">
            <el-switch v-model="params.isPublish" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">


const params = reactive({
    title: '',
    tags: [],
    category: '',
    isPublish: true,
})

const categoryList = [
    {
        id: 1,
        name: '前端',
    },
    {
        id: 2,
        name: '后端',
    },
    {
        id: 3,
        name: '数据库',
    },
    {
        id: 4,
        name: '运维',
    },
    {
        id: 5,
        name: '其他',
    },
]

defineExpose({
    params,
})



</script>
