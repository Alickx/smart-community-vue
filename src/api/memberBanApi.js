import myAxios from "./axios";

/**
 * 查询封禁列表用户
 * @param data
 * @returns {*|AxiosPromise}
 */
export function queryBanMember(data) {
  return myAxios({
    url: "/member/manage/list/query",
    method: "get",
    params: data
  })
}

/**
 * 解封处在封禁列表的用户
 * @param data
 * @returns {AxiosPromise}
 */
export function removeBanMember(data) {
  return myAxios({
    url: "/member/manage/ban/remove",
    method: "post",
    data: data
  })
}

/**
 * 封禁用户
 * @param data
 * @returns {AxiosPromise}
 */
export function banMember(data) {
  return myAxios({
    url: "/member/manage/ban",
    method: "post",
    data: data
  })
}

/**
 * 查询用户的封禁类
 * @returns {*}
 * @param params 用户id
 */
export function queryBanMemberType(params) {
  return myAxios({
    url: "/member/manage/ban/query",
    method: 'get',
    params: params
  })
}