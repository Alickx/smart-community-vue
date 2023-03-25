<template>
  <MainLayout :left-width="5" :right-width="5">
    <template #main>
      <Editor ref="editorRef" />
      <div class="flex flex-row justify-end">
        <el-button class="mt-5 w-50" @click="() => (dialogVisible = true)" type="primary" size="large">发布</el-button>
      </div>
      <el-dialog title="发布文章" v-model="dialogVisible" width="30%">
        <div class="bg-white flex flex-col space-y-6">
          <post-form ref="postFormRef" />
          <el-button class="w-50" @click="submit" type="primary" size="large">确认发布</el-button>
        </div>
      </el-dialog>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
  import MainLayout from '../../layout/main-layout/index.vue';
  import Editor from './components/post-edit-editor/index.vue';
  import PostForm from './components/post-edit-form/index.vue';
  import { savePost } from '/@/api/post';
  import { PostVO } from '/@/api/post/types';

  const editorRef = ref();
  const postFormRef = ref();
  const router = useRouter();
  let dialogVisible = ref(false);

  const submit = () => {
    const { title, tagName, categoryName, isPublish } = postFormRef.value.params;
    const content = editorRef.value.content;

    const data = ref<PostVO>({
      title,
      tagName,
      categoryName,
      isPublish,
      content,
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
