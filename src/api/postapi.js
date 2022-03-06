import myAxios from "./axios";

/**
 *
 * @returns {*}
 * @param param  curPage 现在的页数
 *               sectionUid 分类id
 *               tagUid   标签id
 */
export function getPostList(param){
  return myAxios({
    url: 'api/v1/post/post/list',
    method: 'get',
    params: {
      "curPage": param.curPage,
      "sectionUid": param.sectionUid,
      "tagUid": param.tagUid
    }
  },{
    repeat_request_cancel: true,
    error_message_show: true,
    code_message_show: true
  })
}


export function savePost(postForm){
  return myAxios({
    url: 'api/v1/post/post/save',
    method: 'post',
    data: postForm
  })
}

export function getPostByUid(postUid) {
  return myAxios({
    url: `api/v1/post/post/info/${postUid}`,
    method: 'get'
  })
}


export function saveComment(comment) {
  return myAxios({
    url: 'api/v1/post/comment/save',
    method: 'post',
    data: comment
  })
}

export function getCommentByPost(postUid) {
  return myAxios({
    url: 'api/v1/post/comment/list',
    method: 'get',
    params:{
        postUid: postUid
    }
  })
}

export function thumbSave(params) {
  return myAxios({
    url: 'api/v1/post/thumb/save',
    method: 'post',
    data: params
  })
}

export function thumbCancel(params) {
  return myAxios({
    url: 'api/v1/post/thumb/cancel',
    method: 'post',
    data: params
  })
}