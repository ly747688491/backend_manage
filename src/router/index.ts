/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-23 17:49:26
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-28 17:37:20
 * @Description: 
 */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRoutes } from './constantRoutes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
