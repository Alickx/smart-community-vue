import myAxios from "./axios";


/**
 * 查询用户信息
 * @param uid 用户uid
 * @returns {*|AxiosPromise}
 */
export function getMemberInfoByUid(uid) {
  return myAxios({
    url: `/member/member/info/${uid}`,
    method: 'get'
  })
}

/**
 * 上传用户基础信息
 * @param data
 * @returns {*|AxiosPromise}
 */
export function memberSettingProfileUpload(data) {
  return myAxios({
    url: '/member/member/profile/update',
    method: 'post',
    data: data
  },{
    default_control_error: false
    })
}

/**
 * 查询用户贝壳余额
 * @param param
 * @returns {*}
 */
export function queryMemberConchByUid(param) {
  return myAxios({
    url: '/member/conch/query_info',
    method: 'get',
    params: {
      uid: param
    }
  })
}

/**
 * 关注操作
 * @param data 关注目标的uid
 * @returns {*}
 */
export function followSave(data) {
  return myAxios({
    url: '/member/follow/save',
    method: 'post',
    data: data
  })
}

/**
 * 查询关注状态
 * @param param 关注目标的uid
 * @returns {*}
 */
export function followQuery(param) {
  return myAxios({
    url: '/member/follow/query',
    method: 'get',
    params: {
      followMemberId: param
    }
  })
}