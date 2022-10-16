<template>
    <MainLayout>
        <template #main>
            <div class="bg-white flex flex-col px-10 py-10">
                <el-form :model="params">
                    <el-form-item label="文章标题">
                        <el-input v-model="params.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="文章板块">
                        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
                    </el-form-item>
                </el-form>
                <div>
                    <Editor ref="editorRef" class="h-100" />
                </div>
            </div>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '../../layout/mainLayout/index.vue'
import Editor from './components/editor/index.vue'

const editorRef = ref();

const params = {
    title: '',
    content: '',
    tags: [],
    category: '',
    isPublish: true,
}

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





</script>
