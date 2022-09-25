import { UserState } from '/@/store/modules/user/types';
export interface LoginReq {
  username: string;
  password: string;
  identifier: string;
}

export interface LoginResResultData {
  access_token: string;
  permissions: string[];
  roles: string[];
  userProfile: UserState;
}
