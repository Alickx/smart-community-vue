import myAxios from "./axios";

/**
 *
 * @param paramList
 * @returns {*}
 */
export function getPostList(paramList){
  return myAxios({
    url: 'api/post/post/list',
    method: 'get'
  },{
    repeat_request_cancel: true,
    error_message_show: true,
    code_message_show: true
  })
}