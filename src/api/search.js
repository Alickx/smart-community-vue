import myAxios from "./axios";

export function searchPost(data){
  return myAxios({
    url: 'api/v1/search/post',
    method: 'post',
    data: data
  })
}