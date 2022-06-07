import myAxios from "./axios";

export function getCategoryList() {
  return myAxios({
    url: '/post/category/list',
    method: 'get'
  })
}

export function getCategoryTagList() {
  return myAxios({
    url: '/post/categoryTag/listAll',
    method: 'get'
  })
}