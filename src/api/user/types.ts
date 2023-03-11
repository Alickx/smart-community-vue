export interface UserProfileVO {
  userId: string;
  nickName: string;
  gender: string;
  avatar: string;
  intro: string;
  fanNum: number;
  followNum: number;
  articleNum: number;
  state: number;
}

export interface UserFollowVO {
  userProfile: UserProfileVO;
  followTime: string;
}

export interface UserSaveFollowForm {
  toUserId: string;
  followTime: Date;
  type: number; // 1:关注 2:取消关注
}
