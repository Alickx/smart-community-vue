import myAxios from "./axios";

export function memberLogin(loginForm) {
  return myAxios({
    url: 'login',
    method: 'post',
    data: loginForm
  })
}

export function memberReg(regForm) {
  return myAxios({
    url: 'register',
    method: 'post',
    data: regForm
  }, {
    repeat_request_cancel: true,
    error_message_show: true,
  })
}

export function sendCaptcha(emailAddress){
  return myAxios({
    url: 'register/captcha',
    method: 'get',
    params:{
      emailAddress: emailAddress
    }
  })
}