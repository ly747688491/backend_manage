/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-25 10:57:19
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-25 11:09:48
 * @Description: 
 */
import type { UserInfo } from '@/api/user/types'
export interface LoginParams {
  username: string
  password: string
}

export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  refresh?: string
}