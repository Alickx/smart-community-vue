<template>
  <main-layout>
    <template #main>
      <div class="p-3 bg-white rounded">
        <div v-if="loading">
          <el-skeleton :animated="true" />
        </div>
        <div v-else>
          <div v-if="isActivateSuccess">
            <el-result icon="success">
              <template #title>
                <span class="title">激活成功</span>
              </template>
              <template #sub-title>
                <span class="sub-title">您的账号已激活成功，稍等即会自动跳转至登录，如无反应请点击立即登录</span>
              </template>
              <template #extra>
                <router-link :to="{ name: 'login' }" class="color-blue-4"> 立即登录 </router-link>
              </template>
            </el-result>
          </div>
          <div v-else>
            <el-result icon="error">
              <template #title>
                <span class="title">该激活链接已过期或已无效</span>
              </template>
            </el-result>
          </div>
        </div>
      </div>
    </template>
  </main-layout>
</template>

<script setup lang="ts">
  import { userActivate } from '/@/api/auth';
  import useLoading from '/@/hooks/loading';
  import MainLayout from '/@/layout/main-layout/index.vue';

  const route = useRoute();
  const { loading, setLoading } = useLoading();

  let isActivateSuccess = ref(false);

  const activateHandle = () => {
    setLoading(true);
    const { token } = route.query;

    if (token) {
      userActivate(token as string)
        .then((res) => {
          if (res.code === 200 && res.data) {
            isActivateSuccess.value = true;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  onMounted(() => {
    activateHandle();
  });
</script>
