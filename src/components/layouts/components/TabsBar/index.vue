<template>
  <div class="tabs-bar-container">
    <div class="tabs-content">
      <el-tabs
        type="card"
        v-model="activeTabsValue"
        @tab-click="tabClick"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in visitedViews"
          type="card"
          :key="item.path"
          :path="item.path"
          :label="item.title"
          :name="item.path"
          :closable="!(item.meta && item.meta.affix)"
        >
          <template #label>
            <el-icon
              size="16"
              class="tabs-icon"
              v-if="item.meta && item.meta.icon"
            >
              <component :is="item.meta.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tabs-action">
      <el-dropdown trigger="hover">
        <el-icon color="rgba(0, 0, 0, 0.65)" :size="20">
          <Menu />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeCurrentTab">
              <el-icon :size="14"><FolderRemove /></el-icon>
              关闭当前
            </el-dropdown-item>
            <el-dropdown-item @click="closeOtherTab">
              <el-icon :size="14"><Close /></el-icon>
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item @click="closeAllTab">
              <el-icon :size="14"><FolderDelete /></el-icon>
              关闭所有
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useTabsBarStore } from '@/stores/modules/tabsBar'
import type { RouteRecordRaw } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import type { TabsPaneContext, TabPaneName } from 'element-plus'
import path from 'path-browserify'
import { useAuthStore } from '@/stores/modules/auth'

export type routersType = RouteRecordRaw & {
  title?: string
}
const tabsBarStore = useTabsBarStore()
const authStore = useAuthStore()
const routes = computed(() => authStore.authMenuList)
const visitedViews = computed<routersType[]>(
  () => tabsBarStore.visitedViews,
)
const route = useRoute()
const router = useRouter()
let affixTags = ref<RouteRecordRaw[]>([])

// 添加当前路由
const addTags = () => {
  const { name } = route
  if (name === 'Login') {
    return
  }
  if (name) {
    tabsBarStore.addView(route as unknown as RouteRecordRaw)
  }
  return false
}

function filterAffixTags(routes: RouteRecordRaw[], basePath = '/') {
  let tags = [] as any
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      // 获取 path
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

/**
 * @description: 拿到需要固定的路由表，添加进 store
 * @author: codeBo
 */
const initTags = () => {
  let routesNew = routes.value as RouteRecordRaw[]
  let affixTag = (affixTags.value = filterAffixTags(routesNew))
  for (const tag of affixTag) {
    if (tag.name) {
      tabsBarStore.addVisitedView(tag)
    }
  }
}

onMounted(() => {
  initTags()
  addTags()
})
watch(route, () => {
  addTags()
})
const activeTabsValue = computed({
  get: () => {
    return tabsBarStore.activeTabsValue
  },
  set: (val) => {
    tabsBarStore.setTabsMenuValue(val)
  },
})

// 删除以后切换到下一个
function toLastView(activeTabPath: string) {
  let index = visitedViews.value.findIndex(
    (item) => item.path === activeTabPath,
  )
  const nextTab =
    visitedViews.value[index + 1] || visitedViews.value[index - 1]
  if (!nextTab) return
  router.push(nextTab.path)
  tabsBarStore.addVisitedView(nextTab)
}

// 点击事件
const tabClick = (tabItem: TabsPaneContext) => {
  let path = tabItem.props.name as string
  router.push(path)
}
const isActive = (path: string): boolean => {
  return path === route.path
}
const removeTab = async (activeTabPath: TabPaneName): Promise<any> => {
  if (isActive(activeTabPath as string)) {
    toLastView(activeTabPath as string)
  }
  await tabsBarStore.delView(activeTabPath)
}

// 按钮事件
const closeCurrentTab = () => {
  tabsBarStore.toLastView(route.path)
  tabsBarStore.delView(route.path)
}
const closeOtherTab = () => {
  tabsBarStore.delOtherViews(route.path)
}
const closeAllTab = async () => {
  tabsBarStore.delAllViews()
  tabsBarStore.goHome()
}
</script>

<style scoped lang="less">
@import './index';
</style>
