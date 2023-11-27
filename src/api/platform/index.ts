import http from '@/utils/https'

export function getPlatformList(data: any) {
  return http.get<any>(`plat/platform/`, data)
}

export function addPlatform(data: any) {
  return http.post<any>(`plat/platform/`, data)
}

export function updatePlatform(data: any) {
  return http.put<any>(`plat/platform/${data.id}/`, data)
}

export function deletePlatform(data: any) {
  return http.delete<any>(`plat/platform/${data.id}/`, data)
}

export function getPlatformDetailById(data: any) { 
  return http.get<any>(`plat/platform/${data.id}/`,data)
}

export function getPlatformSelectList(data: any) {
  return http.get<any>(`plat/platform/selectList/`, data)
}

export function deletePlatformBatch(data: any) {
  return http.delete<any>(`plat/platform/multiple_delete/`, data)
}