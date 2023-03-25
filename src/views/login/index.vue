<template>
  <div class="h-100vh bg-[#e0e4e8]">
    <div class="w-80 p-10 rounded-2 bg-white absolute m-auto right-0 left-0 top-30">
      <!-- 头部 -->
      <div class="flex flex-col space-y-5 items-center justify-center tracking-wider">
        <span class="text-3xl color-[black] font-light">智慧社区用户登录</span>
        <svg-icon name="svg-user" color="#0396ff" size="100px" />
      </div>
      <!-- 分割线 -->
      <el-divider />
      <!-- 登录表单 -->
      <login-form @try-submit="handleLogin" ref="loginFormRef" />
      <div class="flex items-center justify-center">
        <el-button size="large" :loading="loading" type="primary" @click="handleLogin">登录</el-button>
      </div>
      <!-- 底部 -->
      <div class="text-base font-medium tracking-wider mt-10">
        <span>暂无账号？</span>
        <RouterLink :to="{ name: 'register' }" class="color-[#3494fc]">请注册 </RouterLink>
      </div>
    </div>
  </div>
  <sliderCaptcha ref="captchaRef" @success="handleSubmit" />
</template>

<script lang="ts" setup name="ViewsLoginIndex">
  import LoginForm from './components/LoginForm/index.vue';
  import useLoading from '/@/hooks/loading';
  import sliderCaptcha from '/@/components/captcha/slider-captcha.vue';
  import { LoginResResultData } from '/@/api/auth/types';
  import { Result } from '/@/types/result';
  import { useUserStore } from '/@/store';
  import { setToken } from '/@/utils/AuthUtil';
  import { ElMessage } from 'element-plus';

  const { loading, setLoading } = useLoading();

  const userStore = useUserStore();

  const captchaRef = ref();
  const loginFormRef = ref();

  const router = useRouter();

  const handleLogin = () => {
    const loginFormInstance = loginFormRef.value!;
    loginFormInstance
      .validate()
      .then(() => captchaRef.value?.show())
      .catch(() => {});
  };

  /**
   * 保存登录信息
   */
  const store = (result: LoginResResultData) => {
    const token = result.accessToken;
    if (token) {
      setToken(token);
    }
    const userProfile = result.userProfile;
    if (userProfile) {
      userStore.setInfo(userProfile);
    }
  };

  const handleSubmit = (captchaId: string) => {
    const loginFormInstance = loginFormRef.value!;
    setLoading(true);
    loginFormInstance
      .doLogin(captchaId)
      .then((res: Result<LoginResResultData>) => {
        if (res.code === 200 && res.data) {
          // 保存用户信息
          store(res.data);
          // 跳转到首页
          router.push({ name: 'home' });
        } else {
          ElMessage({
            message: res.message,
            type: 'error',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
</script>
