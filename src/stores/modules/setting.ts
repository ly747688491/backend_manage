import { defineStore } from 'pinia'
import { DEFAULT_PRIMARY } from '@/config/config'
import type { SettingsState, ThemeConfigProps } from '../model/settingModel'
export const useSettingsStore = defineStore({
  id: 'app-settings',
  state: (): SettingsState => ({
    collapse: true,
    refresh: false, // 刷新页面
    themeConfig: {
      primary: DEFAULT_PRIMARY,
      isDark: false
    }
  }),

  actions: {
    changeCollapse() {
      this.collapse = !this.collapse
    },
    setRefresh() {
      this.refresh = !this.refresh
    },
    setThemeConfig(themeConfig: ThemeConfigProps) {
      this.themeConfig = themeConfig
    }
  },
  persist: true
})
