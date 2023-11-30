/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-23 17:49:26
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-28 17:43:46
 * @Description: 
 */

import { createApp } from 'vue'
import pinia from "./stores/index"

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'
import App from './App.vue'
import router from './router'   

// element默认主题
import 'element-plus/dist/index.css'

// 公共样式，包含自定义暗黑模式，element重置样式
import '@/styles/index.less'

const app = createApp(App)

/** 导入全部Element-icon */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(pinia)
app.use(router)

app.mount('#app')
