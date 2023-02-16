<template>
  <MainLayout>
    <template #main>
      <div class="bg-white flex flex-col px-10 py-10 border-gray-200 border-1 space-y-6">
        <span class="text-xl font-bold">发布文章</span>
        <post-form ref="postFormRef" />
        <SplitLine mode="vertical" />
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
  import MainLayout from '../../layout/main-layout/index.vue';
  import Editor from './components/post-edit-editor/index.vue';
  import SplitLine from '/@/components/split-line/index.vue';
  import PostForm from './components/post-edit-form/index.vue';
  import { savePost } from '/@/api/post';
  import { PostVO } from '/@/api/post/types';

  const editorRef = ref();
  const postFormRef = ref();
  const router = useRouter();

  const submit = () => {
    const { title, tagName, categoryName, isPublish } = postFormRef.value.params;
    const htmlContent = editorRef.value.htmlContent;

    const data = ref<PostVO>({
      title,
      tagName,
      categoryName,
      isPublish,
      content: htmlContent,
    });

    savePost(data.value).then((resp) => {
      router.push({
        name: 'post-view',
        params: {
          id: resp.data,
        },
      });
    });
  };
</script>
