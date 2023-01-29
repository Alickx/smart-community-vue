export type RoleType = '' | '*' | 'admin' | 'user';

export interface UserState {
  userId?: string;
  nickName?: string;
  gender?: string;
  avatar?: string;
  intro?: string;
  fanNum?: number;
  followNum?: number;
  articleNum?: number;
  level?: number;
  score?: number;
  gitee?: string;
  github?: string;
  qqNumber?: string;
  userTag?: number;
  state?: number;
}
