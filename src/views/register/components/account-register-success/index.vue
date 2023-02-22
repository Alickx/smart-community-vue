<template>
  <el-result icon="success">
    <template #title>
      <span class="title">注册成功</span>
    </template>
    <template #sub-title>
      <span class="sub-title">请登录邮箱激活账号</span>
    </template>
    <template #extra>
      <el-button type="primary" @click="goHome">回到首页</el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
  const router = useRouter();

  const goHome = () => {
    router.push({ name: 'home' });
  };
</script>
