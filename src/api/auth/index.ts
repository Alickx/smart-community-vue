import { UserLoginForm, LoginResResultData, CaptchaData, CaptchaConfig, UserRegisterForm } from './types';
import { get, post } from '/@/utils/http/axios';
import { Result } from '/@/types/result';

enum AuthUrlEnum {
  register = '/authApi/auth/register',
  login = '/authApi/auth/login',
  logout = '/authApi/auth/logout',
  gen_captcha = '/authApi/captcha/tianai/gen',
  check_captcha = '/authApi/captcha/tianai/check',
  user_activate = '/authApi/auth/activate',
}

/**
 * 注册
 * @param data 注册表单
 * @returns
 */
export const userRegister = async (data: UserRegisterForm) => post<Result<Boolean>>({ url: AuthUrlEnum.register, data });

/**
 * 登录
 * @param data
 */
export const userLogin = async (data: UserLoginForm) => post<Result<LoginResResultData>>({ url: AuthUrlEnum.login, data });

/**
 * 登出
 */
export const userLogout = async () => post<Result<null>>({ url: AuthUrlEnum.logout });

/**
 * 获取验证码图片
 * @param type 图像验证码类型
 * @returns
 */
export const captchaGen = async (type?: string) => get<CaptchaData>({ url: AuthUrlEnum.gen_captcha, params: { type } });

/**
 * 验证码校验
 * @param id 验证码id
 * @param data true:校验通过/false:校验失败
 * @returns
 */
export const captchaCheck = async (id: string, data: CaptchaConfig) =>
  post<Boolean>({ url: AuthUrlEnum.check_captcha, data, params: { id } });

/**
 * 激活
 */
export const userActivate = async (token: string) => post<Result<Boolean>>({ url: AuthUrlEnum.user_activate, params: { token } });
