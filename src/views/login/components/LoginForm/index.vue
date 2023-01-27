<template>
  <div class="w-80 p-10 rounded-2 bg-white">
    <div class="flex flex-col space-y-5 items-center justify-center tracking-wider">
      <span class="text-3xl color-[black] font-light">智慧社区用户登录</span>
      <svg-icon name="svg-user" color="#0396ff" size="100px" />
    </div>
    <div class="mt-8">
      <el-tabs v-model="tagActive">
        <el-tab-pane label="密码登录" name="password">
          <el-form :hide-required-asterisk="true" class="space-y-5 mt-2" ref="loginFormRef" :rules="rules"
            :model="loginForm">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            <div class="flex flex-row items-center justify-center">
              <el-button type="primary" size="large"  @click="loginHandler(loginFormRef)">登录</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <el-form :hide-required-asterisk="true" ref="loginFormRef" :rules="rules" :model="loginForm">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入手机" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入验证码" />
            </el-form-item>
            <div class="flex flex-row items-center justify-center">
              <el-button type="primary" size="large" @click="loginHandler(loginFormRef)">登录</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="flex flex-col space-y-3 mt-10">
      <div class="flex flex-row items-center">
        <span class="text-base font-medium">第三方登录/注册</span>
        <div class="space-x-3 ml-15">
          <el-button circle size="large">
            <svg-icon name="svg-wechat" size="25px" />
          </el-button>
          <el-button circle size="large">
            <svg-icon name="svg-qq" size="25px" />
          </el-button>
        </div>
      </div>
      <span class="mt-4 text-base font-medium">没有账号，
        <a href="https://baidu.com" class="color-[#3494fc]">立刻注册</a>
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance } from "element-plus";
import { checkEmail } from "/@/utils/validation/CheckEmail";
import { useUserStore } from "/@/store";
import { LoginResResultData } from "/@/api/auth/types";


const userStore = useUserStore();
const loginFormRef = ref<FormInstance>()
const router = useRouter()

const tagActive = ref('password')
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
  username: [{ validator: checkUsername, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }]
})

// 按下enter登录
const enterLogin = (e: KeyboardEvent) => {
  console.log(e);
  if (e.code === 'Enter') {
    loginHandler(loginFormRef.value)
  }
}

// 登录的表单提交
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
          ElMessage.error(res.message)
        } else {
          ElMessage.success('登录成功')
          setTimeout(() => {
            router.push({ name: 'Home' })
          }, 1000)
        }
      })
    }
  })
}

onMounted(() => {
  window.addEventListener('keydown', enterLogin)
})

onUnmounted(() => {
  window.removeEventListener('keydown', enterLogin)
})

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
