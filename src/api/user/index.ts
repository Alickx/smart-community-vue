import { get } from '/@/utils/http/axios';
import { UserState } from '/@/store/modules/user/types';

enum URL {
  profile = '/user/profile',
}

const getUserProfile = async () => get<Result<UserState>>({ url: URL.profile });
export { getUserProfile };
