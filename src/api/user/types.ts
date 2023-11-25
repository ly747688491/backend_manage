export interface LoginData {
  username: string
  password: string
  captcha: string
}

export interface LoginResponse {
  access: string
  refresh: string
}
export interface RefreshResponse {
  access: string
}

export interface UserRes {
  userId?: string
  nickname: string
  avatar: string
  buttons: string[]
  roles: string[]
  router: string[]
  company: string
}

/** 用户权限数据类型 */
export interface AuthInfo {
  roles: string[]
  router: string[]
}

/* 用户信息接口返回值类型 */
export interface UserInfo {
  id?: string
  nickname: string
  avatar: string
  company: string
}

export interface CaptchaData {
  key: number
  image_base: string
}
