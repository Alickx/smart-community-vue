<template>
  <ul class="flex flex-col space-y-7 fixed">
    <li @click="thumbHandle(postData?.id, postData?.expansion.isThumb)" class="bg-white rounded-full cursor-pointer">
      <el-badge type="info" :max="99" :value="postData?.thumbCount">
        <svg-icon :color="postData?.expansion.isThumb ? 'blue' : 'black'" class="p-3" size="25px" name="svg-thumb-block" />
      </el-badge>
    </li>
    <li @click="commentClick" class="bg-white rounded-full cursor-pointer">
      <el-badge type="info" :max="99" :value="postData?.commentCount">
        <svg-icon :color="postData?.expansion.isComment ? 'blue' : 'black'" class="p-3" size="25px" name="svg-comment-block" />
      </el-badge>
    </li>
    <li @click="collectClick" class="bg-white rounded-full cursor-pointer">
      <svg-icon :color="postData?.expansion.isCollect ? 'blue' : 'black'" class="p-3" size="25px" name="svg-collect-block" />
    </li>
    <li class="bg-white rounded-full cursor-pointer">
      <svg-icon class="p-3" size="25px" name="svg-share-block" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { PostInfoVO } from '/@/api/post/types';
  import { useUserStore } from '/@/store';
  import { useDebounceFn } from '@vueuse/core';
  import { cancelThumb, saveThumb } from '/@/api/post';
  import { thumbTypeEnum } from '/@/constant/thumb-type-const';
  import { deleteCollect, saveCollect } from '/@/api/user';

  const props = defineProps<{ postData: PostInfoVO }>();

  const userStore = useUserStore();
  const router = useRouter();

  const emit = defineEmits(['update:thumbState', 'update:thumbCount', 'click:comment', 'update:collectState']);

  /**
   * 点赞操作
   * @param id 目标id
   * @param thumbState 点赞状态
   */
  const thumbHandle = (id: string, thumbState: boolean) => {
    if (!userStore.getIsLogin) {
      router.push({
        name: 'login',
      });
      return;
    }
    // 请求
    debounceThumbHandle(id, thumbState);
  };

  /**
   * thumbState false 未点赞 true 已点赞
   *
   */
  const debounceThumbHandle = useDebounceFn((id: string, thumbState: boolean) => {
    if (!thumbState) {
      saveThumb(id, thumbTypeEnum.POST).then((resp) => {
        if (resp.code === 200) {
          emit('update:thumbState', true);
          emit('update:thumbCount', props.postData.thumbCount + 1);
        }
      });
    } else {
      cancelThumb(id, thumbTypeEnum.POST).then((resp) => {
        if (resp.code === 200) {
          emit('update:thumbState', false);
          emit('update:thumbCount', props.postData.thumbCount - 1);
        }
      });
    }
  }, 100);

  /**
   * 收藏操作
   */
  const debounceCollectHandle = useDebounceFn((id: string, collectState: boolean) => {
    if (!collectState) {
      saveCollect(id).then((resp) => {
        if (resp.code === 200) {
          emit('update:collectState', true);
        }
      });
    } else {
      deleteCollect(id).then((resp) => {
        if (resp.code === 200) {
          emit('update:collectState', false);
        }
      });
    }
  }, 100);

  /**
   * 点击评论按钮
   */
  const commentClick = () => {
    if (!userStore.getIsLogin) {
      router.push({
        name: 'login',
      });
      return;
    }
    emit('click:comment');
  };

  const collectClick = () => {
    if (!userStore.getIsLogin) {
      router.push({
        name: 'login',
      });
      return;
    }
    debounceCollectHandle(props.postData?.id, props.postData?.expansion.isCollect);
  };
</script>
