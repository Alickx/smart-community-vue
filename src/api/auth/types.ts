import { UserState } from '/@/store/modules/user/types';
export interface LoginReq {
  username: string;
  password: string;
  identifier: string;
}

export interface LoginResResultData {
  accessToken: string;
  userProfile: UserState;
}
