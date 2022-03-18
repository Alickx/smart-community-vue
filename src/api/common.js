import myAxios from "./axios";

export function getOssPolicy() {
    return myAxios({
      url:'api/v1/thirdpart/oss/getPolicy',
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