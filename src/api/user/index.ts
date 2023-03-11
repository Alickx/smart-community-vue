import { get, post } from '/@/utils/http/axios';
import { Result } from '/@/types/result';
import { UserProfileVO, UserSaveFollowForm } from './types';

enum URL {
  query_profile = '/userApi/user/profile',
  save_follow_user = '/userApi/user/follow/saveFollow',
  query_follow_user = '/userApi/user/follow/queryUserFollow',
  query_is_follow_user = '/userApi/user/follow/queryIsFollow',
}

const getUserProfile = async () => get<Result<UserProfileVO>>({ url: URL.query_profile });

const followUser = async (data: UserSaveFollowForm) => post<Result<boolean>>({ url: URL.save_follow_user, data });

const queryFollowUser = async (userId: string) => get<Result<UserProfileVO[]>>({ url: URL.query_follow_user, params: { userId } });

const queryIsFollowUser = async (toUserId: string) => get<Result<boolean>>({ url: URL.query_is_follow_user, params: { toUserId } });

export { getUserProfile, followUser, queryFollowUser, queryIsFollowUser };
