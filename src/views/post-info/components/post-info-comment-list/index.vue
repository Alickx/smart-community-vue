<template>
  <div class="space-y-13 mt-15">
    <template v-for="comment in commentList" :key="comment.id">
      <comment
        class="list-item"
        :post-id="postId"
        :thumb-type="thumbTypeEnum.COMMENT"
        @delete:comment="onDeleteComment"
        :comment="comment"
        :type="commentTypeEnum.COMMENT"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { pageComment } from '/@/api/post';
  import { CommentVO } from '/@/api/post/types';
  import { commentTypeEnum } from '/@/constant/comment-type-const';
  import Comment from '/@/components/comment/index.vue';
  import { thumbTypeEnum } from '/@/constant/thumb-type-const';

  const props = defineProps<{
    postId: string;
  }>();

  let params = {
    postId: props.postId,
    page: 1,
    size: 5,
    type: commentTypeEnum.COMMENT,
    sort: 'create_time,desc',
  };

  let commentList = ref<CommentVO[]>([]);

  const pageRequest = () => {
    pageComment(params).then((resp) => {
      if (resp.code === 200) {
        commentList.value = resp.data!.records;
      }
    });
  };

  const onDeleteComment = (commentId: string) => {
    const updateList = commentList.value.filter((comment) => comment.id !== commentId);
    setTimeout(() => {
      commentList.value = updateList;
    }, 500);
  };

  defineExpose({
    commentList,
  });

  onMounted(() => {
    pageRequest();
  });
</script>

<style scoped>
  .list-item {
    opacity: 1;
    transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out;
    transform: translateY(0);
  }

  .list-item.removing {
    opacity: 0;
    transform: translateY(-20px);
  }
</style>
