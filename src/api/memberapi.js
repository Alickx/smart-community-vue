import myAxios from "./axios";


export function sendCaptcha(emailAddress){
    return myAxios({
        url: 'api/v1/thirdpart/captcha/sendEmailCaptcha',
        method: 'get',
        params:{
            emailAddress: emailAddress
        }
    })
}
