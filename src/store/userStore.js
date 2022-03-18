import { createStore } from "vuex";
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "userInfo",
  render(state) {
    return {
      userInfo: state.user_info,
      access_token: state.access_token,
      permission_list: state.permission_list,
      role_list: state.role_list,
      is_login: state.is_login
    }
  }
})

export default createStore({
  state: {
    user_info: Object,
    access_token: '',
    permission_list: [],
    role_list: [],
    is_login: false,
    searchKeyword: ''
  },
  getters: {
    getUserInfo(state) {
      return state.user_info;
    },
    getAccessToken(state){
      return state.access_token
    },
    getRoleList(state){
      return state.role_list
    },
    getPermissionList(state){
      return state.permission_list
    },
    getIsLogin(state){
      return state.is_login
    },
    getSearchKeyword(state){
      return state.searchKeyword
    }
  },
  mutations: {
    setUserInfo(state,userInfo) {
      state.user_info = userInfo;
    },
    setAccessToken(state,accessToken) {
      state.access_token = accessToken;
    },
    setRoleList(state,roleList) {
      state.role_list = roleList;
    },
    setPermissionList(state,permissionList) {
      state.permission_list = permissionList;
    },
    setIsLogin(state){
      state.is_login = true;
    },
    setSearchKeyword(state,value){
      state.searchKeyword = value
    },
    uploadMemberSetting(state,data){
      const { avatar,birthday,gender,intro,nickName } = data;
      state.user_info.avatar = avatar
      state.user_info.birthday = birthday
      state.user_info.gender = gender
      state.user_info.intro = intro
      state.user_info.nickName = nickName
    },
    logout(state){
      window.localStorage.removeItem("userInfo");
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("permission_list");
      window.localStorage.removeItem("role_list");
      state.is_login = false
    }
  },
  plugins:[vuexLocal.plugin]
});
