<template>
  <el-form ref="regFormRef" :model="registerForm" :rules="rules">
    <el-form-item prop="username">
      <el-input v-model.trim="registerForm.username" @keyup.enter.native="trySubmit" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        show-password
        v-model.trim="registerForm.password"
        @keyup.enter.native="trySubmit"
        type="password"
        placeholder="请输入用户密码"
      />
    </el-form-item>
    <el-form-item prop="userEmail">
      <el-input v-model.trim="registerForm.userEmail" @keyup.enter.native="trySubmit" placeholder="请输入用户邮箱" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import { RegisterFormInstance } from '../../type';
  import { userRegister } from '/@/api/auth';
  import { UserRegisterForm } from '/@/api/auth/types';

  const regFormRef = ref<FormInstance>();

  let registerForm = reactive<UserRegisterForm>({
    username: '',
    password: '',
    userEmail: '',
  });

  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: '请输入正确的用户名', trigger: 'blur' },
    ],
    password: [{ required: true, type: 'string', message: '请输入密码', trigger: 'blur' }],
    userEmail: [
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
      { required: true, type: 'string', message: '请输入邮箱', trigger: 'blur' },
    ],
  });

  const validate = async () => {
    if (!regFormRef.value) return;
    return await regFormRef.value.validate();
  };

  // 定义事件
  const emits = defineEmits<{
    (e: 'trySubmit'): void;
  }>();

  // 尝试提交表单
  function trySubmit() {
    emits('trySubmit');
  }

  defineExpose<RegisterFormInstance>({
    validate,
    doRegister(captchaId: string) {
      return userRegister({
        username: registerForm.username,
        password: registerForm.password,
        userEmail: registerForm.userEmail,
        captchaId, // 验证码id
      });
    },
  });
</script>
