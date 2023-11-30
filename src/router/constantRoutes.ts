/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-28 17:36:14
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-28 17:37:49
 * @Description: 
 */
import type { RouteRecordRaw } from 'vue-router'
import { HOME_URL, LOGIN_URL } from '@/config/config'

const LAYOUT = () => import('@/components/layouts/index.vue')
const Error404Component = () => import('@/views/error/error-404.vue')

/**
 * @description 静态路由
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: LOGIN_URL,
    name: '2',
    meta: {
      isHide: true
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      isHide: true
    },
    component: Error404Component
  },
  {
    path: '/',
    name: 'LAYOUT',
    component: LAYOUT,
    redirect: HOME_URL,
    meta: {
      title: '首页',
      icon: 'HomeFilled'
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          affix: true
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: LAYOUT,
    redirect: '/user/info',
    meta: {
      isHide: true
    },
    children: [
      {
        path: '/user/info',
        name: 'User',
        component: () => import('@/views/user/index.vue'),
        meta: {
          isHide: true
        }
      }
    ]
  },
  // 此路由防止控制台出现No match found for location with path的警告
  {
    path: '/:catchAll(.*)',
    meta: {
      isHide: true
    },
    component: Error404Component
  }
]

/**
 * @description 路由未找到
 */
export const notFoundRouter: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: '404'
}
