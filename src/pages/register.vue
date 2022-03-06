<template>
  <div class="contain">
    <div class="container">
      <div class="login-box-container">
        <div class="logo">
          <span>智慧社区用户注册</span>
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
                  <user-outlined />
                </template>
              </a-input>
            </a-form-item>
            <a-popover placement="right" trigger="click" arrow-point-at-center>
            <template #content>
              <p>请输入8-16位密码<br>密码中至少包含一个英文和数字</p>
            </template>
            <a-form-item has-feedback name="passWord">
            <a-input-password placeholder="请输入密码" v-model:value="loginForm.passWord">
              <template #prefix>
                <key-outlined />
              </template>
            </a-input-password>
          </a-form-item>
            </a-popover>
          <a-form-item name="captcha">
            <a-input-search
              v-model:value="loginForm.captcha"
              placeholder="请填写验证码"
              size="default"
              @search="sendCaptch"
            >
              <template #enterButton>
                <a-button>
                  <span style="font-size: 15px;">发送验证码</span>
                </a-button>
              </template>
            </a-input-search>
          </a-form-item>

          <div class="login-form-button">
            <a-form-item>
              <a-button type="primary" html-type="submit" block size="large">注册</a-button>
            </a-form-item>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons-vue';
import { sendCaptcha } from '../api/memberapi';
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/index'
import {memberReg} from "../api/loginapi";
import router from "../router";


let loginForm = reactive({
  username: '',
  passWord: '',
  captcha: ''
});


const sendCaptch = ()=>{
  sendCaptcha(loginForm.username).then(res=>{
    if (res.data.code === 0) {
      message.success("发送验证码成功！")
    }
  })
}

const loginFormSubmit = (value) => {
    memberReg(value).then(res=>{
    if (res.data.code === 0) {
      message.success("注册成功！请重新登录")
      router.push({name:"login"});
    }
  })
}

//校验规则

/**
 * 用户名校验
 */

let checkUsername = async (_rule, value) => {

  if (!value) {
    return Promise.reject("请输入注册邮箱");
  }

  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

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

  const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/
  if (!reg.test(value)) {
    return Promise.reject("请输入正确的密码");
  }
  return Promise.resolve();
}

let checkCaptch = async (_rule, value) => {
  if (!value) {
    return Promise.reject("请输入验证码");
  }

  const reg = /^[0-9A-Za-z]{6}$/
  if (!reg.test(value)) {
    return Promise.reject("请正确输入验证码")
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
  captcha: [{
    required: true,
    validator: checkCaptch,
    trigger: 'change'
  }]
}


</script>

<style scoped>
.contain {
  height: 100%;
  display: flex;
  justify-content: center;
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
