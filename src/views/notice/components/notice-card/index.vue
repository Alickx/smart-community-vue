<template>
  <div class="flex flex-row">
    <div class="flex flex-1 flex-row">
      <router-link custom v-slot="{ href }" :to="{ name: 'user-home', params: { id: notice.sender?.userId } }">
        <a target="_blank" :href="href">
          <avatar :src="notice.sender?.avatar" :size="3" />
        </a>
      </router-link>
      <div class="flex flex-1 flex-col ml-3">
        <div class="mr-5 space-y-3 mb-4 flex-1">
          <!--      标题-->
          <div v-if="props.msgType === NoticeTypeEnum.THUMB">
            {{ notice.sender.nickName }} 赞了你的{{ notice.sourceType === 0 ? '文章' : '评论' }}
            <router-link :to="{ name: 'post-view', params: { id: notice.postId } }" class="color-[#007fff]">
              {{ notice.postTitle }}
            </router-link>
          </div>
          <div v-if="props.msgType === NoticeTypeEnum.COMMENT">
            {{ notice.sender.nickName }} {{ notice.sourceType === 0 ? '回复' : '评论' }}了你
            <router-link :to="{ name: 'post-view', params: { id: notice.postId } }" class="color-[#007fff]">
              {{ notice.postTitle }}
            </router-link>
          </div>
          <div v-if="props.msgType === NoticeTypeEnum.FOLLOW">
            <span>{{ notice.sender.nickName }}关注了你</span>
          </div>
          <div v-if="props.msgType === NoticeTypeEnum.SYSTEM">
            <span>{{ notice.content }}</span>
          </div>
          <div class="border-1 p-2 rounded border-[#f1f1f2] bg-[#fafbfc]" v-if="isContentShow">
            <span class="text-sm">
              {{ notice.content }}
            </span>
          </div>
        </div>
        <!--        信息栏-->
        <span class="text-sm color-gray">{{ dateComputed }}</span>
      </div>
    </div>
    <div class="h-20 w-20"></div>
  </div>
</template>

<script setup lang="ts">
  import { NoticeMessageVO } from '/@/api/notice/type';
  import avatar from '/@/components/avatar/index.vue';
  import { dateFormatDay } from '../../../../utils/DateFormatUtil';
  import { NoticeTypeEnum } from '../../../../constant/notice-type-const';

  const props = defineProps<{
    notice: NoticeMessageVO;
    msgType: number;
  }>();

  const isContentShow = computed(() => {
    if (props.msgType === NoticeTypeEnum.COMMENT) {
      return true;
    }
    if (props.msgType === NoticeTypeEnum.THUMB) {
      if (props.notice.sourceType === 1) {
        return true;
      }
    }
    return false;
  });

  const dateComputed = computed(() => {
    return dateFormatDay(props.notice.createTime);
  });
</script>
