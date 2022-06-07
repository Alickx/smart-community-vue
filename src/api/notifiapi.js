import myAxios from "./axios";

/**
 * 查询用户未读通知总数
 * @returns {*}
 */
export function queryNotificationNotReadCount() {
  return myAxios({
    url: '/notification/count/unread',
    method: 'get',
  },{
    code_message_show: false,
    error_message_show: false
  })
}

/**
 *
 * @param data
 * @returns {*}
 */
export function queryRemind(data) {
  return myAxios({
    url: '/notification/eventRemind/query',
    method: 'post',
    data: data
  })
}