<template>
    <el-form :model="params">
        <el-form-item label="文章标题:">
            <el-input v-model="params.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章板块:">
            <el-select v-model="params.category" placeholder="请选择板块">
                <el-option v-for="item in categoryList" :key="item.value" :label="item.name" :value="item.value">
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

<script setup lang="ts">import { getCategorySelect } from '/@/api/post';



const params = reactive({
    title: '',
    tags: [],
    category: '',
    isPublish: true,
})

const categoryList = ref<selectData[]>([])


onMounted(()=>{
    // 获取文章板块下拉列表
    getCategorySelect().then(resp=> {
        categoryList.value = resp.data;
    })
})

defineExpose({
    params,
})



</script>
