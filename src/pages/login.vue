<template>
  <div class="contain">
    <div class="container">
      <div class="login-box-container">
        <div class="logo">
          <span>智慧社区用户登录</span>
          <p>愿你我共同分享一切</p>
        </div>
        <a-form
            :rules="rules"
            autocomplete="off"
            @finish="loginFormSubmit"
            :model="loginForm"
            class="login-form"
        >
          <a-form-item has-feedback name="username">
            <a-input placeholder="请输入邮箱地址" v-model:value="loginForm.username">
              <template #prefix>
                <user-outlined/>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback name="passWord">
            <a-input-password placeholder="请输入密码" v-model:value="loginForm.passWord">
              <template #prefix>
                <key-outlined/>
              </template>
            </a-input-password>
          </a-form-item>
<!--          TODO 协议-->
          <div class="login-form-button">
            <a-form-item>
              <a-button type="primary" :loading="loading" html-type="submit" block size="large">登录</a-button>
            </a-form-item>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue';
import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons-vue';
import 'ant-design-vue/es/message/style/index'
import {useRoute, useRouter} from 'vue-router';
import {memberLogin} from "../api/loginapi";
import {message} from "ant-design-vue";
import {useStore} from "vuex";


const store = useStore();
const router = useRouter();
const route = useRoute();

let loginForm = reactive({
  username: '',
  passWord: '',
  rememberMe: false
});

let loading = ref(false);

onMounted(() => {
  if (store.getters.getIsLogin) {
    router.push({name: 'index'})
  }
})

const loginFormSubmit = (value) => {
  loading.value = true;
  memberLogin(value).then(res => {
      setTimeout(() => {
        if (res.data.code === 0) {
          const {user_info, access_token, permission_list, role_list} = res.data.data
          store.commit('setUserInfo', user_info);
          store.commit('setAccessToken', access_token);
          store.commit('setPermissionList', permission_list);
          store.commit('setRoleList', role_list);
          store.commit('setIsLogin', true);
          loading.value = false;
          //有redirect登录成功返回将要跳转的页面且返回上一页不是登录页
          if (route.query.redirect && route.query.redirect !== '/login') {
            router.replace(route.query.redirect)
          } else {
            router.replace("/");
          }
        } else {
          loading.value = false;
          message.error(res.data.message);
        }
      }, 500)
  })
}
//校验规则

/**
 * 用户名校验
 */

let checkUsername = async (_rule, value) => {

  if (!value) {
    return Promise.reject("请输入邮箱");
  }

  const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;

  if (!reg.test(value)) {
    return Promise.reject("请输入正确的邮箱");
  }
  return Promise.resolve();
}

/**
 * 密码校验
 */

let checkPass = async (_rule, value) => {
  if (!value) {
    return Promise.reject("请输入密码");
  }

  // const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/
  const reg = /^[a-zA-Z0-9_-]{6,18}$/;
  if (!reg.test(value)) {
    return Promise.reject("请输入正确的密码");
  }
  return Promise.resolve();
}

const rules = {
  username: [{
    required: true,
    validator: checkUsername,
    trigger: 'blur'
  }],
  passWord: [{
    required: true,
    validator: checkPass,
    trigger: 'blur'
  }],
  rememberMe: [{
    required: false
  }]
}


</script>

<style scoped>
.contain {
  display: flex;
  justify-content: center;
  height: 100vh;
}

.container {
  padding: 25px;
  background-color: #ffffff;
  max-width: 860px;
  width: 460px;
  max-height: 450px;
  border-radius: 10px;
  position: relative;
  margin: 60px 0 0 0;
}

.login-box-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.login-form {
  padding: 25px;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo span {
  font-size: 20px;
  font-weight: 500;
  font-family: "Courier New", Courier, monospace;
  color: #000000;
}

.logo p {
  font-size: 15px;
  font-weight: 300;
  color: #7f8085;
}

.login-form-button {
  display: flex;
  justify-content: center;
}
</style>
