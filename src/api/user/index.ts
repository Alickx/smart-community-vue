import { get } from '/@/utils/http/axios';
import { Result } from '/@/types/result';
import { UserProfileDTO } from './types';

enum URL {
  profile = '/userApi/user/profile',
}

const getUserProfile = async () => get<Result<UserProfileDTO>>({ url: URL.profile });

export { getUserProfile };
