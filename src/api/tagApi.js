import myAxios from "./axios";

export function getTagList() {
  return myAxios({
    url: '/post/tag/list',
    method: 'get'
  })
}

export function getTagByCategory(categoryUid){
  return myAxios({
    url: '/post/categoryTag/list',
    params:{
      categoryUid: categoryUid
    }
  })
}