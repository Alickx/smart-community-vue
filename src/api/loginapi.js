import myAxios from "./axios";

export function memberLogin(loginForm) {
  return myAxios({
    url: '/auth/login',
    method: 'post',
    data: loginForm
  },{
    error_message_show: false,
    default_control_error: false
  })
}

export function memberReg(regForm) {
  return myAxios({
    url: '/auth/register',
    method: 'post',
    data: regForm
  }, {
    repeat_request_cancel: true,
    error_message_show: true,
  })
}

/**
 * 登出账号
 * @returns {*}
 */
export function memberLogout() {
  return myAxios({
    url: '/auth/logout',
    method: 'post'
  }, {
    error_message_show: false
  })
}

/**
 * 发送验证码
 * @param emailAddress
 * @returns {*}
 */
export function sendCaptcha(emailAddress){
  return myAxios({
    url: '/thirdpart/register/captcha',
    method: 'post',
    params:{
      emailAddress: emailAddress
    }
  })
}

/**
 * 查询是否登录
 */
export function queryIsLogin() {
  return myAxios({
    url: '/auth/isLogin',
    method: 'get'
  },{
    default_control_error: false
  })
}