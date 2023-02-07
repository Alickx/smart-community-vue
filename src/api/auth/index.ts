import { LoginReq, LoginResResultData } from './types';
import { post } from '/@/utils/http/axios';
import { Result } from '/@/types/result';

enum AuthUrlEnum {
  register = '/authApi/auth/register',
  login = '/authApi/auth/login',
  logout = '/authApi/auth/logout',
}

/**
 * 登录
 * @param data
 */
const login = async (data: LoginReq) => post<Result<LoginResResultData>>({ url: AuthUrlEnum.login, data });

/**
 * 登出
 */
const logout = async () => post<Result<null>>({ url: AuthUrlEnum.logout });

export { login, logout };
