import type { RouteRecordRaw } from 'vue-router'
import { ElNotification } from 'element-plus'
import NProgress from '@/config/nprogress'
import { RESEETSTORE } from '@/utils/reset'
import { useUserStore } from '@/stores/modules/user'
import { useAuthStore } from '@/stores/modules/auth'
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/config'
import router from './index'
import { dynamicRoutes } from './dynamicRoutes'
import { notFoundRouter, staticRoutes } from './constantRoutes'

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const authStore = useAuthStore()
  const userStore = useUserStore()

  if (to.path === LOGIN_URL) {
    if (userStore.token) {
      return next(from.fullPath)
    }
    return next()
  }

  if (ROUTER_WHITE_LIST.includes(to.path)) {
    return next()
  }

  if (!userStore.token) {
    return next({ path: LOGIN_URL, query: { redirect: to.fullPath } })
  }

  authStore.setRouteName(to.name as string)
  if (!authStore.authRouterList.length) {
    try {
      console.log("initDynamicRouter")
      await initDynamicRouter()
      return next({ ...to, replace: true })
    } catch (error) {
      return next({ path: LOGIN_URL })
    }
  }

  return next()
})

router.afterEach(() => {
  NProgress.done()
})

router.onError((error) => {
  console.log(error)
  NProgress.done()
})

const initDynamicRouter = async () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  try {
    console.log("get user info");
    
    await userStore.GetInfoAction()

    if (!authStore.authRouterList.length) {
      ElNotification({
        title: '无权限访问',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000
      })
      RESEETSTORE()
      router.replace(LOGIN_URL)
      return Promise.reject('No permission')
    }

    const routerList = filterAsyncRoutes(dynamicRoutes, authStore.authRouterList)

    routerList.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    router.addRoute(notFoundRouter)

    const menuList = getMenuList([...staticRoutes, ...routerList] as unknown as Menu.MenuOptions[])

    authStore.setAuthMenuList(menuList)
  } catch (error) {
    RESEETSTORE()
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}

function filterAsyncRoutes(routes: RouteRecordRaw[], authRouterList: string[]) {
  return routes.filter((route) => {
    if (!authRouterList.includes(route.name as string)) {
      return false
    }

    if (route.children && route.children.length > 0) {
      route.children = filterAsyncRoutes(route.children, authRouterList)
    }
    return true
  })
}

function getMenuList(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))

  return newMenuList.filter((item) => {
    if (item.children?.length) {
      item.children = getMenuList(item.children)
    }
    return !item.meta?.isHide
  })
}
