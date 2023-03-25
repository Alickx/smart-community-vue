<template>
  <el-form class="max-w-70%" :model="userProfileForm" label-width="80px" ref="formRef" label-position="right">
    <el-form-item label="昵称">
      <el-input v-model="userProfileForm.nickName" placeholder="请输入昵称" />
    </el-form-item>
    <el-form-item label="个人介绍">
      <el-input type="textarea" v-model="userProfileForm.intro" placeholder="请输入个人介绍" />
    </el-form-item>
    <el-form-item label="个人头像">
      <avatar-upload v-model="userProfileForm.avatar" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { getUserProfile, updateUserProfile } from '/@/api/user';
  import AvatarUpload from './components/avatar-upload/index.vue';
  import { ElMessage } from 'element-plus';

  const userProfileForm = reactive({
    nickName: '',
    avatar: '',
    intro: '',
  });
  const formRef = ref();

  const getProfile = async () => {
    const { data } = await getUserProfile();
    userProfileForm.nickName = data!.nickName;
    userProfileForm.avatar = data!.avatar;
    userProfileForm.intro = data!.intro;
  };

  const submit = () => {
    updateUserProfile(userProfileForm).then((resp) => {
      if (resp.code === 200 && resp.data) {
        ElMessage({
          message: '更新成功',
          type: 'success',
        });
        (formRef.value as any).resetFields();
        getProfile();
      }
    });
  };

  onMounted(() => {
    getProfile();
  });
</script>

<style scoped>
  :deep .el-textarea__inner {
    min-height: 130px !important;
  }
</style>
