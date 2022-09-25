import {LoginReq, LoginResResultData} from "./types";
import { post } from "/@/utils/http/axios";

enum AuthUrlEnum {
  register = 'auth/register',
  login = 'auth/login',
  logout = 'auth/logout',
}

/**
 * 登录
 * @param data
 */
const login = async (data: LoginReq) => post<Result<LoginResResultData>>({ url: AuthUrlEnum.login, data });

/**
 * 登出
 */
const logout = async () => post<Result<null>>({url: AuthUrlEnum.logout });

export {
  login,
  logout
}
