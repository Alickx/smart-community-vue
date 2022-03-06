import myAxios from "./axios";

export function getSectionList() {
  return myAxios({
    url: '/api/v1/post/section/list',
    method: 'get'
  })
}