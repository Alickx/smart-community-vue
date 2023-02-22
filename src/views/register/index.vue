<template>
  <div class="h-100vh bg-[#e0e4e8]">
    <div class="w-80 p-10 rounded-2 bg-white absolute m-auto right-0 left-0 top-30">
      <div v-if="!isSuccess">
        <!-- 头部 -->
        <div class="flex flex-col space-y-5 items-center justify-center tracking-wider">
          <span class="text-3xl color-[black] font-light">智慧社区用户注册</span>
          <svg-icon name="svg-user" color="#0396ff" size="100px" />
        </div>
        <!-- 分割线 -->
        <el-divider />
        <!-- 登录表单 -->
        <account-register-form @try-submit="handleRegister" ref="regFormRef" />
        <div class="flex items-center justify-center">
          <el-button size="large" :loading="loading" type="primary" @click="handleRegister">注册</el-button>
        </div>
        <!-- 底部 -->
        <div class="text-base font-medium tracking-wider mt-10">
          <span>已有账号?</span>
          <RouterLink :to="{ name: 'login' }" class="color-[#3494fc]"> 请登录 </RouterLink>
        </div>
      </div>
      <account-register-success v-else />
    </div>
  </div>
  <SliderCaptcha ref="captchaRef" @success="handleSubmit" />
</template>
<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import accountRegisterForm from './components/account-register-form/index.vue';
  import SliderCaptcha from '/@/components/captcha/slider-captcha.vue';
  import useLoading from '/@/hooks/loading';
  import { Result } from '/@/types/result';
  import accountRegisterSuccess from './components/account-register-success/index.vue';

  const { loading, setLoading } = useLoading();

  const regFormRef = ref();
  let captchaRef = ref();
  let isSuccess = ref(false);

  const handleRegister = () => {
    const regFormInstance = regFormRef.value!;
    regFormInstance.validate().then(() => captchaRef.value?.show()).catch(() => {});
  };

  const handleSubmit = (captchaId: string) => {
    const regFormInstance = regFormRef.value!;
    setLoading(true);
    regFormInstance
      .doRegister(captchaId)
      .then((res: Result<Boolean>) => {
        if (res.code === 200) {
          ElMessage({
            type: 'success',
            message: '注册成功!',
          });
          isSuccess.value = true;
        } else {
          ElMessage({
            type: 'error',
            message: res.message,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
</script>
