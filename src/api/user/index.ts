/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-25 11:01:54
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-25 11:12:09
 * @Description: 
 */
import http from '@/utils/https'
import type { LoginData, UserRes, LoginResponse, RefreshResponse, CaptchaData } from './types'

/**
 * 登录
 */
export function login(data: LoginData) {
  return http.post<LoginResponse>('user/login/', data)
}

export function refresh() {
  return http.post<RefreshResponse>('sys/user/Refresh/')
}

export function getCaptcha() {
  return http.get<CaptchaData>('captcha/')
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return http.get<UserRes>(`user/user/user_info/`)
}

/**
 * 退出登陆
 */
export function logout() {
  return http.get('user/user/logout/')
}
