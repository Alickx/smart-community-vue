import myAxios from "./axios";

/**
 * 获取Oss上传Policy
 * @returns {*}
 */
export function getOssPolicy() {
    return myAxios({
      url:'/thirdpart/oss/getPolicy',
      method:'post'
    })
}

/**
 * 上传文件oss
 * @param host
 * @param fromData
 * @returns {*}
 */
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