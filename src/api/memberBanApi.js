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

export function removeBanMember(data) {
  return myAxios({
    url: "/member/manage/ban/remove",
    method: "post",
    data: data
  })
}