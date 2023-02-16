export const useSearchStore = defineStore('search', {
  state: () => ({
    keyword: '',
  }),

  getters: {
    getKeyword(state): string {
      return state.keyword;
    },
  },

  actions: {
    setKeyword(keyword: string) {
      this.keyword = keyword;
    },
  },
});
