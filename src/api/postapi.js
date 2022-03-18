import myAxios from "./axios";

/**
 *
 * @param param  curPage 现在的页数
 *               sectionUid 分类id
 *               tagUid   标签id
 * @param pageParam 分页参数
 *              curPage: 现在的页数
 *              limit: 一页限制多少条
 *              sidx: 根据哪个字段排序
 *              order: 正序:asc 倒序:desc
 * @returns {*|AxiosPromise}
 */
export function getPostList(param,pageParam){
  return myAxios({
    url: 'api/v1/post/post/list',
    method: 'post',
    data: pageParam,
    params: {
      "sectionUid": param.sectionUid,
      "tagUid": param.tagUid
    }
  },{
    repeat_request_cancel: true,
    error_message_show: true,
    code_message_show: true
  })
}

/**
 * 发布或编辑文章
 * @param postForm
 * @returns {*|AxiosPromise}
 */
export function savePost(postForm){
  return myAxios({
    url: 'api/v1/post/post/save',
    method: 'post',
    data: postForm
  })
}

/**
 *  获取指定文章的内容
 * @param postUid 文章uid
 * @returns {*|AxiosPromise}
 */
export function getPostByUid(postUid) {
  return myAxios({
    url: `api/v1/post/post/info/${postUid}`,
    method: 'get'
  })
}

/**
 *  发送评论
 * @param comment
 * @returns {*|AxiosPromise}
 */
export function saveComment(comment) {
  return myAxios({
    url: 'api/v1/post/comment/save',
    method: 'post',
    data: comment
  })
}

/**
 * 获取指定文章的所有评论
 * @param queryParam 查询分页参数
 * @param postUid
 * @returns {*|AxiosPromise}
 */
export function getCommentByPost(queryParam,postUid) {
  return myAxios({
    url: 'api/v1/post/comment/list',
    method: 'post',
    data: queryParam,
    params:{
        postUid: postUid
    }
  })
}

/**
 * 点赞
 * @param params
 * @returns {*|AxiosPromise}
 */
export function thumbSave(params) {
  return myAxios({
    url: 'api/v1/post/thumb/save',
    method: 'post',
    data: params
  })
}

/**
 * 取消点赞
 * @param params
 * @returns {*|AxiosPromise} promise
 */
export function thumbCancel(params) {
  return myAxios({
    url: 'api/v1/post/thumb/cancel',
    method: 'post',
    data: params
  })
}

/**
 * 根据用户id查询全部可见文章
 * @param params
 *      curPage: 页数
 *      limit: 一页条数
 *      memberUid: 目标用户Uid
 * @returns {*|AxiosPromise}
 */
export function queryPostByMemberUid(params) {
  return myAxios({
    url: 'api/v1/post/post/query_list',
    method: 'post',
    data: params
  })
}

/**
 * 获取用户
 * @param params
 * @returns {*}
 */
export function  queryThumbByMemberUid(params){
  return myAxios({
    url: 'api/v1/post/thumb/query_list',
    method: 'post',
    data: params
  })
}