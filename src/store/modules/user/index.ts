import { defineStore } from 'pinia';
import { clearToken } from '/@/utils/AuthUtil';
import { userLogout } from '/@/api/auth';
import { getUserProfile } from '/@/api/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: undefined,
    userName: undefined,
    nickName: undefined,
    avatar: undefined,
    intro: undefined,
    fanNum: undefined,
    followNum: undefined,
    articleNum: undefined,
    state: undefined,
  }),
  persist: {
    key: 'user',
    storage: window.localStorage,
  },
  getters: {
    getUserProfile(state) {
      return { ...state };
    },
    getIsLogin(): boolean {
      return !!this.userId;
    },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial) {
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
    // Logout
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
      // 路由表重置
      location.reload();
    },
  },
});
