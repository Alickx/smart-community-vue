<template>
  <div class="login-form">
    <div class="login-form-warp">
      <el-form :hide-required-asterisk="true"
               ref="loginFormRef"
               :rules="rules"
               :model="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"  placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginHandler(loginFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {FormInstance} from "element-plus";
import {checkEmail} from "/@/utils/validation/checkEmail";
import {useUserStore} from "/@/store";
import {LoginResResultData} from "/@/api/auth/types";


const userStore = useUserStore();
const loginFormRef = ref<FormInstance>()
const router = useRouter()

//TODO 集成第三方登录,现在默认邮箱密码登录
const loginForm = reactive({
  username: '',
  password: '',
  identifier: '0'
})

const checkUsername = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入邮箱'))
  }
  if (!checkEmail(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

const checkPassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    callback()
  }
}

// 校验用户名和密码规则
const rules = reactive({
  username: [{validator: checkUsername, trigger: 'blur'}],
  password: [{validator: checkPassword, trigger: 'blur'}]
})

const loginHandler = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    console.log('formEl is undefined')
    return;
  }
  formEl.validate((valid: boolean) => {
    if (valid) {
      const res = userStore.login(loginForm);
      res.then((res: Result<LoginResResultData>) => {
        if (res.code !== 200) {
          //TODO 登录失败
        } else {
          //跳转到首页
          router.push({path: '/'})
        }
      })
    } else {
      console.log('登录失败');
    }
  })
}


</script>

<style lang="less" scoped>

.login-form {
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;

  &-warp {
    margin-top: 20px;
  }

}


</style>
