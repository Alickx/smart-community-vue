import myAxios from "./axios";


export function logout(){
    return myAxios({
        url: 'api/v1/member/member/logout',
        method: 'get',
    })
}

export function getMemberInfoByUid(uid){
    return myAxios({
        url: `api/v1/member/member/info/${uid}`,
        method: 'get'
    })
}

export function memberSettingProfileUpload(data){
    return myAxios({
        url: 'api/v1/member/member/profile/update',
        method:'post',
        data: data
    })
}