import { UserProfileDTO } from '../user/types';

export interface PostVO {
  categoryId: string;
  tagId: string;
  title: string;
  content: string;
  isPublish: boolean;
}

export interface CategoryDTO {
  categoryId: string;
  name: string;
  icon: string;
  url: string;
  intro: string;
}

export interface TagDTO {
  tagId: string;
  content: string;
  intro: string;
}

export interface ContentExpansionBO {
  isComment: boolean;
  isThumb: boolean;
  isAuthor: boolean;
  isCollect: boolean;
  isMoreReply: boolean;
}

export interface PostInfoDTO {
  id: string;
  categoryId: string;
  authorId: string;
  title: string;
  content: string;
  collectCount: number;
  thumbCount: number;
  commentCount: number;
  updateTime: string;
  createTime: string;
  author: UserProfileDTO;
  category: CategoryDTO;
  tag: TagDTO;
  expansion: ContentExpansionBO;
  region: string;
}

/**
 * 首页文章缩略对象
 */
export interface PostAbbreviationDTO {
  id: string;
  categoryId: string;
  authorId: string;
  title: string;
  collectCount: number;
  thumbCount: number;
  commentCount: number;
  summary: string;
  updateTime: string;
  createTime: string;
  author: UserProfileDTO;
  category: CategoryDTO;
  tag: TagDTO;
  expansion: ContentExpansionBO;
}

export interface PostQO {
  categoryId: string;
  authorId: string;
}

export interface CommentVO {
  id?: string;
  postId: string;
  toUserId: string;
  content: string;
  type: number;
  firstCommentId: string;
}

export interface CommentQO {
  postId?: string;
  toUserId?: string;
  type: number;
  firstCommentId?: string;
}

export interface CommentDTO {
  id: string;
  userId: string;
  postId: string;
  toUserId: string;
  content: string;
  thumbCount: number;
  type: number;
  firstCommentId: string;
  createTime: string;
  userProfile: UserProfileDTO;
  expansion: ContentExpansionBO;
  replyList: PageResult<CommentDTO>;
}
