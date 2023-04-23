<template>
  <div class="p-5 bg-white rounded w-66">
    <div class="flex flex-col space-y-3">
      <div class="flex flex-row space-x-5 items-center">
        <avatar :src="user.avatar" :size="45" />
        <div class="flex flex-col space-y-2">
          <span class="text-base font-bold">{{ user.nickName }}</span>
        </div>
      </div>
      <div class="flex flex-row space-x-2 justify-center" v-if="isShowButtonHandleComputed">
        <el-button :type="isFollow ? 'warn' : 'success'" @click="clickFollowHandle" class="w-[122px] !h-[35px]">{{
          isFollow ? '已关注' : '关注'
        }}</el-button>
        <el-button class="w-[122px] !h-[35px]">私信</el-button>
      </div>
    </div>
    <el-divider />
    <div class="flex flex-col space-y-3">
      <div class="flex flex-row space-x-5 items-center">
        <svg-icon name="svg-fans" size="20px" />
        <span class="text-sm">它的粉丝</span>
        <span class="text-sm">{{ user.fanNum }}</span>
      </div>
      <div class="flex flex-row space-x-5 items-center">
        <svg-icon name="svg-article" size="20px" />
        <span class="text-sm">它的文章</span>
        <span class="text-sm">{{ user.articleNum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { saveFollowUser, queryIsFollowUser } from '/@/api/user';
  import { UserProfileVO, UserSaveFollowForm } from '/@/api/user/types';
  import { useUserStore } from '/@/store/modules/user';

  const props = defineProps<{
    user: UserProfileVO;
  }>();

  const router = useRouter();
  const userStore = useUserStore();
  let isFollow = ref(false);

  const isShowButtonHandleComputed = computed(() => {
    return props.user.userId !== userStore.getUserProfile.userId;
  });

  /**
   * 关注操作
   */
  const clickFollowHandle = () => {
    // 如果未登录，跳转到登录页面
    if (!userStore.getUserProfile.userId) {
      router.push({ name: 'login' });
      return;
    }

    const followForm: UserSaveFollowForm = {
      toUserId: props.user.userId,
      followTime: new Date(),
      // 1: 关注 2: 取消关注
      type: isFollow.value ? 2 : 1,
    };

    saveFollowUser(followForm).then((resp) => {
      if (resp.code === 200 && resp.data) {
        isFollow.value = !isFollow.value;
        ElMessage.success(isFollow.value ? '关注成功' : '取消关注成功');
      }
    });
  };

  /**
   * 查询是否关注
   */
  const queryFollow = () => {
    queryIsFollowUser(props.user.userId).then((resp) => {
      if (resp.code === 200 && resp.data) {
        isFollow.value = resp.data;
      }
    });
  };

  onMounted(() => {
    if (userStore.getIsLogin) {
      queryFollow();
    }
  });
</script>

<style scoped></style>
