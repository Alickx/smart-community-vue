<template>
  <div class="flex flex-row p-4 justify-center space-x-10 bg-white min-h-30">
    <avatar :src="userProfile.avatar" :size="100" />
    <div class="flex-1 flex flex-col space-y-3">
      <span class="font-semibold text-xl">{{ userProfile.nickName }}</span>
      <p class="text-normal color-gray">{{ userProfile.intro }}</p>
    </div>
    <div class="items-end flex" v-if="isOwner">
      <router-link :to="{ name: 'user-setting-profile' }">
        <el-button size="large" type="primary" plain>编辑资料</el-button>
      </router-link>
    </div>
    <div class="items-end flex" v-else>
      <!-- 关注 -->
      <el-button :type="isFollow ? 'warn' : 'success'" @click="clickFollowHandle" class="w-[122px] !h-[35px]">{{
        isFollow ? '已关注' : '关注'
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { UserProfileVO, UserSaveFollowForm } from '/@/api/user/types';
  import { PropType } from 'vue';
  import Avatar from '/@/components/avatar/index.vue';
  import { useUserStore } from '/@/store';
  import { queryIsFollowUser, saveFollowUser } from '/@/api/user';
  import { ElMessage } from 'element-plus';

  const props = defineProps({
    userProfile: {
      type: Object as PropType<UserProfileVO>,
      required: true,
    },
  });

  const userStore = useUserStore();
  const router = useRouter();

  let isFollow = ref(false);

  const isOwner = computed(() => {
    return userStore.userId === props.userProfile.userId;
  });

  /**
   * 查询是否关注
   */
  const queryFollow = () => {
    queryIsFollowUser(props.userProfile.userId).then((resp) => {
      if (resp.code === 200 && resp.data) {
        isFollow.value = resp.data;
      }
    });
  };

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
      toUserId: props.userProfile.userId,
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

  onMounted(() => {
    queryFollow();
  });
</script>
