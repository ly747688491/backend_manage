/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-25 11:12:38
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-27 16:57:50
 * @Description: 
 */
import http from '@/utils/https'
import type { PeriodictaskList, TaskList } from './types'

export function getPTaskList(params:any) { 
  return http.get('/task/periodictask/',params)
}

export function getPTaskDetail(params: any) { 
  return http.get('/task/periodictask/',params)
}

export function getPrdcTaskMthdLst() {
  return http.get<PeriodictaskList>(`/api/task/periodictask/tasklist/`)
}

export function getCronPtask(params?: any) {
  return http.get<TaskList>(`/api/task/periodictask/`, params)
}

export function setCronPtask(params?: any) {
  return http.post<TaskList>(`/api/task/periodictask/`, params)
}

export function updateCronPtask(params: any) {
  return http.put<TaskList>(`/api/task/periodictask/${params.id}/`, params)
}

export function deleteCronPtask(params: any) {
  return http.delete(`/api/task/periodictask/${params.id}/`)
}

export function CronPtaskEnabled(params: any) {
  return http.put(`/api/task/periodictask/enabled/${params.id}/`, params)
}
