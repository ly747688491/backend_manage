/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-25 10:54:56
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-25 10:56:30
 * @Description: 
 */
import { useUserStore } from '@/stores/modules/user'
import { useAuthStore } from '@/stores/modules/auth'
export function RESEETSTORE() {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  userStore.$reset()
  authStore.$reset()
  // 清除用户信息缓存
  localStorage.removeItem('app-user')
}
