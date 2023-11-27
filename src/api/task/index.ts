/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-25 11:12:38
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-27 16:57:50
 * @Description: 
 */
import http from '@/utils/https'


export function getPTaskList(params:any) { 
  return http.get('/task/periodictask/',params)
}

export function getPTaskDetail(params: any) { 
  return http.get('/task/periodictask/',params)
}

