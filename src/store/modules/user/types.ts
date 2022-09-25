export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  userId?: string;
  nickname?: string;
  gender?: string;
  avatar?: string;
  intro?: string;
  fans?: number;
  follow?: number;
  score?: number;
  gitee?: string;
  github?: string;
  qqNumber?: string;
  commentState?: number;
  userTag?: number;
  state?: number;
}
