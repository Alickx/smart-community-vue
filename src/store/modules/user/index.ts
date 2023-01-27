import {defineStore} from 'pinia';
import {clearToken, setToken} from '/@/utils/AuthUtil';
import {UserState} from './types';
import {LoginReq} from "/@/api/auth/types";
import {login, logout} from "/@/api/auth";
import {getUserProfile} from "/@/api/user";

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: undefined,
    nickName: undefined,
    gender: undefined,
    avatar: undefined,
    intro: undefined,
    fans: undefined,
    follow: undefined,
    score: undefined,
    gitee: undefined,
    github: undefined,
    qqNumber: undefined,
    commentState: undefined,
    userTag: undefined,
    state: undefined
  }),
  persist: {
    key: 'user',
    storage: window.localStorage,
  },
  getters: {
    getUserProfile(state: UserState): UserState {
      return {...state};
    },
    getIsLogin(): boolean {
      return !!this.userId;
    }
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      console.log('设置用户信息', partial);
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await getUserProfile();
      if (result.code === 200) {
        this.setInfo(result.data);
      }

    },
    // 异步登录并存储token和用户信息
    async login(loginForm: LoginReq) {
      const res = await login(loginForm);
      const token = res?.data?.access_token;
      if (token) {
        setToken(token);
      }
      const userProfile = res?.data?.userProfile;
      if (userProfile) {
        this.setInfo(userProfile);
      }
      return res;
    },
    // Logout
    async logout() {
      await logout();
      this.resetInfo();
      clearToken();
      // 路由表重置
      location.reload();
    },
  },
});
