<template>
  <el-form ref="loginFormRef" :rules="rules" :model="loginForm">
    <el-form-item prop="username">
      <el-input v-model.trim="loginForm.username" @keyup.enter.native="trySubmit" placeholder="请输入用户名或邮箱" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model.trim="loginForm.password" @keyup.enter.native="trySubmit" type="password" placeholder="请输入密码" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
  import { FormInstance, FormRules } from 'element-plus';
  import { UserLoginForm } from '/@/api/auth/types';
  import { LoginFormInstance } from '../../type';
  import { userLogin } from '/@/api/auth';

  const loginFormRef = ref<FormInstance>();

  const loginForm = reactive<UserLoginForm>({
    username: '',
    password: '',
    captchaId: '',
  });

  const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入账号或邮箱', trigger: 'blur' }],
    password: [{ required: true, type: 'string', message: '请输入密码', trigger: 'blur' }],
  });

  // 定义事件
  const emits = defineEmits<{
    (e: 'trySubmit'): void;
  }>();

  // 尝试提交表单
  function trySubmit() {
    emits('trySubmit');
  }

  // 登录的表单提交
  const validate = async () => {
    if (!loginFormRef.value) return;
    return await loginFormRef.value.validate();
  };

  defineExpose<LoginFormInstance>({
    validate,
    doLogin(captchaId: string) {
      return userLogin({
        username: loginForm.username,
        password: loginForm.password,
        captchaId, // 验证码id
      });
    },
  });
</script>
