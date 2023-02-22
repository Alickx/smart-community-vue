<template>
  <div class="flex flex-col space-y-3 h-full">
    <div
      ref="replyInputRef"
      contenteditable="true"
      @keyup="onInput()"
      class="border-1 rounded-lg flex-1 border-gray p-2 bg-white resize-none h-full focus:border-blue focus:border-1.5"
    >
    </div>
    <div class="flex justify-end">
      <el-button type="primary" size="large" :disabled="content === ''" @click="submitReply">提交</el-button>
    </div>
  </div>
  <div></div>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import { saveComment } from '/@/api/post';
  import { CommentForm } from '/@/api/post/types';
  import { commentTypeEnum } from '../../constant/comment-type-const';

  const props = withDefaults(
    defineProps<{
      postId: string;
      type: number;
      toUserId: string;
      firstCommentId?: string;
    }>(),
    {
      postId: '',
      type: undefined,
      toUserId: '',
      firstCommentId: '',
    },
  );

  const emit = defineEmits(['comment:submit', 'reply:submit']);

  const content = ref('');
  const replyInputRef = ref<HTMLElement>();

  const onInput = () => {
    content.value = replyInputRef.value?.innerText || '';
  };

  const checkContent = (): boolean => {
    return content.value !== '';
  };

  const reset = () => {
    content.value = '';
    replyInputRef.value!.innerText = '';
  };

  const getSubmitData = (): CommentForm => {
    return {
      postId: props.postId,
      type: props.type,
      toUserId: props.toUserId,
      firstCommentId: props.firstCommentId,
      content: content.value,
    };
  };

  const submitReply = () => {
    if (!checkContent()) {
      return;
    }

    const data = getSubmitData();

    saveComment(data).then((resp) => {
      if (!resp.data) {
        ElMessage.error(resp.message);
      } else {
        const id = resp.data;
        if (props.type === commentTypeEnum.COMMENT) {
          emit('comment:submit', data, id);
        } else {
          emit('reply:submit', data, id);
        }
        reset();
      }
    });
  };

  onMounted(() => {
    replyInputRef.value!.focus();
  });
</script>
