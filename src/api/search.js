import myAxios from "./axios";

export function searchPost(data){
  return myAxios({
    url: '/search/post',
    method: 'post',
    data: data
  })
}