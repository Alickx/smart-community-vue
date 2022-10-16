<template>
    <MainLayout>
        <template #main>
            <div class="bg-white flex flex-col px-10 py-10 border-gray-200  border-1 space-y-6">
                <span class="text-xl font-bold">发布文章</span>
                <post-form ref="postFormRef" />
                <SplitLine/>
                <div class="border-1 border-gray-300">
                    <Editor ref="editorRef" class="h-120 overflow-hidden" />
                </div>
                <div class="flex flex-row justify-end">
                    <el-button class="w-50" @click="submit" type="primary" size="large">发布</el-button>
                </div>
            </div>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '../../layout/mainLayout/index.vue'
import Editor from './components/editor/index.vue'
import SplitLine from '/@/components/SplitLine/index.vue';
import PostForm from './components/postForm/index.vue';

const editorRef = ref();
const postFormRef = ref();


const submit = () => {

    const { title,tag,category,isPublish } = postFormRef.value.params;
    const htmlContent = editorRef.value.htmlContent;

    const data = {
        title,
        tag,
        category,
        isPublish,
        htmlContent,
    }

    console.log(data);

}




</script>
