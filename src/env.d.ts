/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-24 09:33:49
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-24 09:34:02
 * @Description: 
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}