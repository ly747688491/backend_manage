import { defineStore } from 'pinia'
import { getUserInfo, logout } from '@/api/index'
import type { UserState } from '../model/userModel'
import type { UserInfo } from '@/api/user/types'
import { useAuthStore } from './auth'
import { RESEETSTORE } from '@/utils/reset'
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: '',
    refresh: '',
    userInfo: null
  }),
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token
    },
    // setUserInfo
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    async GetInfoAction() {
      const { data } = await getUserInfo()

      const { avatar, nickname, roles, router, company, id } = data.data

      const authStore = useAuthStore()
      // 存储用户信息
      this.setUserInfo({ avatar, nickname, company, id })
      // 存储用户权限信息
      authStore.setAuth({ roles, router })
    },
    async Logout() {
      await logout()
      RESEETSTORE()
    }
  },
  // 设置为true，缓存state
  persist: true
})
