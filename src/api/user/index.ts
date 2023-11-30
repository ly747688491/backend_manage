/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-25 11:01:54
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-25 11:12:09
 * @Description: 
 */
import http from '@/utils/https'
import type { LoginData, UserRes, LoginResponse, RefreshResponse, CaptchaData } from './types'


export function login(data: LoginData) {
  return http.post<LoginResponse>('user/login/', data)
}

export function refresh() {
  return http.post<RefreshResponse>('sys/user/Refresh/')
}

export function getCaptcha() {
  return http.get<CaptchaData>('captcha/')
}

export function getUserInfo() {
  return http.get<UserRes>(`user/user/user_info/`)
}

export function logout() {
  return http.get('user/user/logout/')
}
