<template>
  <div @click="onClickPost(post.id, $event)" class="flex flex-row p-2 space-y-3 items-center">
    <div class="flex flex-col flex-1 space-y-2">
      <span class="font-bold text-lg">{{ post.title }}</span>
      <div>
        <!--      信息栏-->
        <div class="flex flex-row space-x-2 items-center text-sm color-gray">
          <span>{{ post.createTime }}</span>
          <el-divider direction="vertical" />
          <span>{{ post.thumbCount }}点赞</span>
          <span>{{ post.commentCount }}评论</span>
          <span>{{ post.collectCount }}收藏</span>
        </div>
      </div>
    </div>
    <div>
      <el-dropdown>
        <el-button size="small">
          <svg-icon name="svg-more" size="15px" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>编辑</el-dropdown-item>
            <el-dropdown-item @click.stop="onClickDelete(post.id)">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PostAbbreviationVO } from '/@/api/post/types';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { deletePost } from '/@/api/post';

  defineProps<{
    post: PostAbbreviationVO;
  }>();

  const emit = defineEmits<{
    (event: 'delete:post', id: string): void;
  }>();

  const onClickPost = (id: string, event) => {
    // 如果点击的是链接或者按钮，不跳转
    if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON' || event.target.tagName === 'svg') {
      return;
    }
    window.open(`/post/${id}`, '_blank');
  };

  const onClickDelete = (id: string) => {
    ElMessageBox.confirm('删除内容后不可恢复，确定删除吗？', '删除内容', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      deletePost(id)
        .then((res) => {
          if (res.data) {
            ElMessage({
              message: '删除成功!',
              type: 'success',
              duration: 1500,
            });
            emit('delete:post', id);
          }
        })
        .catch(() => {
          ElMessage({
            message: '删除失败,请稍后重试!',
            type: 'error',
            duration: 1500,
          });
        });
    });
  };
</script>

<style scoped></style>
