<template>
  <ul>
    <li v-for="item in followList" :key="item.userProfile.userId">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row space-x-5 items-center">
          <avatar :src="item.userProfile.avatar" :size="50" />
          <span class="text-base font-bold">{{ item.userProfile.nickName }}</span>
        </div>
        <div>
          <el-button @click="followHandle(item.userProfile.userId, getIsUnFollowComputed(item.userProfile.userId))" type="">{{
            getIsUnFollowComputed(item.userProfile.userId) === 1 ? '关注' : '取消关注'
          }}</el-button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  // 关注
  import { queryFollowUser, saveFollowUser } from '/@/api/user';
  import { UserFollowVO, UserSaveFollowForm } from '/@/api/user/types';
  import { ElMessage } from 'element-plus';
  import Avatar from '/@/components/avatar/index.vue';
  import { useUserStore } from '/@/store';

  const userStore = useUserStore();

  const pageParam = reactive({
    page: 1,
    size: 5,
    userId: userStore.userId,
    sort: 'createTime,desc',
  });

  const followList = ref<UserFollowVO[]>([]);

  const unFollowList = ref<string[]>([]);

  const getIsUnFollowComputed = (userId: string) => {
    return unFollowList.value.includes(userId) ? 1 : 2;
  };

  const queryFollow = () => {
    console.log('1');
    queryFollowUser(pageParam).then((resp) => {
      if (resp.code === 200 && resp.data) {
        followList.value = resp.data.records;
      }
    });
  };

  const followHandle = (userId: string, type: number) => {
    const form: UserSaveFollowForm = {
      toUserId: userId,
      followTime: new Date(),
      type: type,
    };

    saveFollowUser(form).then((res) => {
      if (res.code === 200 && res.data) {
        if (type === 1) {
          unFollowList.value = unFollowList.value.filter((item) => item !== userId);
          ElMessage({
            message: '关注成功',
            type: 'success',
          });
        } else {
          unFollowList.value.push(userId);
          ElMessage({
            message: '取消关注成功',
            type: 'success',
          });
        }
      }
    });
  };

  onMounted(() => {
    queryFollow();
  });
</script>

<style scoped></style>
