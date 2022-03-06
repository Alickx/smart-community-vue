import myAxios from "./axios";

export function getTagList() {
  return myAxios({
    url: '/api/v1/post/tag/list',
    method: 'get'
  })
}

export function getTagBySection(sectionUid){
  return myAxios({
    url: '/api/v1/post/sectiontag/list',
    params:{
      sectionUid: sectionUid
    }
  })
}