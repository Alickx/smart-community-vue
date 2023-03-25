import { get, post } from '/@/utils/http/axios';
import { PageResult, Result } from '/@/types/result';
import { UserFollowVO, UserProfileForm, UserProfileVO, UserSaveFollowForm } from './types';
import { PageParam } from '/@/types/req';
import { PostAbbreviationVO } from '/@/api/post/types';

enum URL {
  query_profile = '/userApi/user/profile',
  update_profile = '/userApi/user/profile/update',
  save_follow_user = '/userApi/user/follow/saveFollow',
  query_follow_user = '/userApi/user/follow/queryUserFollow',
  query_is_follow_user = '/userApi/user/follow/queryIsFollow',
  query_page_collect = '/userApi/user/collect/page',
  save_collect = '/userApi/user/collect/save',
  delete_collect = '/userApi/user/collect/delete',
  query_is_exist = '/userApi/user/collect/queryIsExist',
  query_user_fans = '/userApi/user/follow/queryFollowerByPage',
}

export const getUserProfile = async () => get<Result<UserProfileVO>>({ url: URL.query_profile });

export const updateUserProfile = async (data: UserProfileForm) =>
  post<Result<boolean>>({
    url: URL.update_profile,
    data,
  });

export const saveFollowUser = async (data: UserSaveFollowForm) =>
  post<Result<boolean>>({
    url: URL.save_follow_user,
    data,
  });

export const queryFollowUser = async (params: PageParam) => get<Result<PageResult<UserFollowVO>>>({ url: URL.query_follow_user, params });

export const queryIsFollowUser = async (toUserId: string) =>
  get<Result<boolean>>({
    url: URL.query_is_follow_user,
    params: { toUserId },
  });

/**
 * 查询收藏文章分页
 * @param params
 */
export const queryPageCollect = async (params: PageParam) =>
  get<Result<PageResult<PostAbbreviationVO>>>({ url: URL.query_page_collect, params });

/**
 * 保存收藏
 * @param postId
 */
export const saveCollect = async (postId: string) => post<Result<boolean>>({ url: URL.save_collect, params: { postId } });

/**
 * 删除收藏
 * @param postId
 */
export const deleteCollect = async (postId: string) =>
  post<Result<boolean>>({
    url: URL.delete_collect,
    params: { postId },
  });

/**
 * 查询是否收藏
 * @param postId
 */
export const queryIsExist = async (postId: string) => get<Result<boolean>>({ url: URL.query_is_exist, params: { postId } });

/**
 * 查询用户粉丝
 * @param params 分页参数
 */
export const queryUserFans = async (params: PageParam) =>
  get<Result<PageResult<UserFollowVO>>>({
    url: URL.query_user_fans,
    params,
  });
