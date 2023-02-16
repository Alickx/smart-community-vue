import { NoticeCountVO } from '/@/api/notice/type';
import { NoticeTypeEnum } from '/@/constant/noticeTypeEnum';

export const useNoticeStore = defineStore('notice', {
  state: () => ({
    noticeThumbCount: 0,
    noticeCommentCount: 0,
    noticeFollowCount: 0,
    noticeSystemCount: 0,
  }),

  getters: {
    getNoticeCount(): number {
      return this.noticeThumbCount + this.noticeCommentCount + this.noticeFollowCount + this.noticeSystemCount;
    },
  },

  actions: {
    setNoticeCount(noticeCountData: NoticeCountVO[]) {
      for (const noticeCount of noticeCountData) {
        switch (noticeCount.noticeType) {
          case NoticeTypeEnum.THUMB:
            this.noticeThumbCount = noticeCount.noticeCount;
            break;
          case NoticeTypeEnum.COMMENT:
            this.noticeCommentCount = noticeCount.noticeCount;
            break;
          case NoticeTypeEnum.FOLLOW:
            this.noticeFollowCount = noticeCount.noticeCount;
            break;
          case NoticeTypeEnum.SYSTEM:
            this.noticeSystemCount = noticeCount.noticeCount;
            break;
        }
      }
    },
  },
});
