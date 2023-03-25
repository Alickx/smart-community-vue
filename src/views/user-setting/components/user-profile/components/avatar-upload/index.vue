<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <avatar :src="imageUrl" class="cursor-pointer" />
  </el-upload>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import type { UploadProps } from 'element-plus';
  import { useUserStore } from '/@/store';
  import Avatar from '/@/components/avatar/index.vue';

  const userStore = useUserStore();

  const imageUrl = ref(userStore.getUserProfile.avatar as unknown as string);

  const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  };

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('Avatar picture must be JPG format!');
      return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Avatar picture size can not exceed 2MB!');
      return false;
    }
    return true;
  };
</script>

<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
</style>
