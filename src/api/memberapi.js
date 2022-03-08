import myAxios from "./axios";


export function logout(){
    return myAxios({
        url: 'api/v1/member/member/logout',
        method: 'get',
    })
}