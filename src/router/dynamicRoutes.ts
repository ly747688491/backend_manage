import type { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/layouts/index.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
    // 账号管理
  {
    path: '/system',
    name: 'system',
    component: LAYOUT,
    redirect: '/system/user',
    meta: {
      title: '系统管理',
      icon: 'Lock'
    },
    children: [
      {
        name: 'user',
        path: '/system/user',
        component: () => import('@/views/manage/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'Lock'
        }
      },
      {
        name: 'role',
        path: '/system/role',
        component: () => import('@/views/manage/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Lock'
        }
      },
            {
        name: 'permission',
        path: '/system/permission',
        component: () => import('@/views/manage/permission/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'Lock'
        }
      },
                  {
        name: 'menu',
        path: '/system/menu',
        component: () => import('@/views/manage/menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Lock'
        }
      },
                        {
        name: 'journal',
        path: '/system/journal',
        component: () => import('@/views/manage/journal/index.vue'),
        meta: {
          title: '日志管理',
          icon: 'Lock'
        }
      }
    ]
  },
]
