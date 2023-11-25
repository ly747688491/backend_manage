/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-25 10:53:03
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-25 10:56:10
 * @Description: 
 */
export const num = 0

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
    ? '上午好'
    : hour <= 13
    ? '中午好'
    : hour < 20
    ? '下午好'
    : '晚上好'
}

export function welcome() {
  const arr = [
    '加油努力工作',
    '喝一杯咖啡吧',
    '休息一会儿吧',
    '准备吃什么呢',
    '要不要站起来活动一下'
  ]
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
