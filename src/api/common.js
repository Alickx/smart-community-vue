import myAxios from "./axios";

export function getOssPolicy() {
    return myAxios({
      url:'/thirdpart/oss/getPolicy',
      method:'post'
    })
}

export function ossUpload(host,fromData){
  return myAxios({
    url: host,
    method:'post',
    data: fromData,
    headers:{
      "Content-Type":"multipart/form-data"
    }
  })
}