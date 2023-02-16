import { UserProfileDTO } from '/@/api/user/types';

export interface NoticeCountVO {
  noticeCount: number; // 通知数量

  noticeType: number; // 通知类型 0 点赞 1 评论 2 关注 3 @ 4 系统
}

export interface NoticeMessageVO {
  content: string; // 通知内容
  createTime: string; // 通知创建时间
  id: string; // 通知id
  postId: string; // 文章id
  postTitle: string; // 文章标题
  sourceType: number; // 通知来源类型 0 文章 1 评论
  status: number; // 0 未读 1 已读
  title: string; // 通知标题
  sender: UserProfileDTO; // 发送者
}
