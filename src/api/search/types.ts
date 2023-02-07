import { UserProfileDTO } from '/@/api/user/types';

export interface searchPage {
  id: string;
  authorId: string;
  title: string;
  collectCount: number;
  thumbCount: number;
  commentCount: number;
  summary: string;
  createTime: string;
  author: UserProfileDTO;
  categoryId: string;
  tagId: string;
  categoryName: string;
  tagName: string;
}
