import { UserProfileDTO } from '/@/api/user/types';
export interface UserLoginForm {
  username: string; // 用户名 / 邮箱
  password: string; // 密码
  captchaId?: string; // 验证码Id
}

export interface LoginResResultData {
  accessToken: string; // 访问令牌
  userProfile: UserProfileDTO; // 用户信息
}

export interface UserRegisterForm {
  username: string; // 用户名
  password: string; // 密码
  userEmail: string; // 邮箱
  captchaId?: string; // 验证码Id
}

export interface CaptchaConfig {
  startX?: number
  startY?: number
  type?: string
  startTime?: Date
  stopTime?: Date
  trackArr?: Track[]
  end?: number
  bgImageWidth?: number
  bgImageHeight?: number
  sliderImageWidth?: number
  sliderImageHeight?: number
  movePercent?: number
  moveX?: number
  t?: number
}

export interface Track {
  x: number
  y: number
  type: string
  t: number
}

export interface CaptchaData {
  id: string
  captcha: {
    backgroundImage: string
    sliderImage: string
    backgroundImageWidth: number
    backgroundImageHeight: number
    sliderImageWidth: number
    sliderImageHeight: number
    data: null
  }
}
