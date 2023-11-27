import http from '@/utils/https'

export function getMenuList(data: any) {
  return http.get<any>(`sys/menu/`,data)
}

export function getMenuById(data: any) {
  return http.get<any>(`sys/menu/${data.id}/`, data)
}

export function addMenu(data: any) {
  return http.post<any>(`sys/menu/`, data)
}

export function updateMenu(data: any) {
  return http.put<any>(`sys/menu/${data.id}/`, data)
}

export function deleteMenu(data: any) {
  return http.delete<any>(`sys/menu/${data.id}/`, data)
}

export function deleteMenuBatch(data: any) {
  return http.delete<any>(`sys/menu/multiple_delete/`, data)
}

export function getPermissionList(data: any) {
  return http.get<any>(`sys/permission/`, data)
}

export function getPermissionById(data: any) { 
  return http.get<any>(`sys/permission/${data.id}/`, data)
}

export function addPermission(data: any) { 
  return http.post<any>(`sys/permission/`, data)
}

export function updatePermission(data: any) {
  return http.put<any>(`sys/permission/${data.id}/`, data)
}

export function deletePermission(data: any) { 
  return http.delete<any>(`sys/permission/${data.id}/`, data)
}

export function deletePermissionBatch(data: any) {
  return http.delete<any>(`sys/permission/multiple_delete/`, data)
}

export function getRoleList(data: any) { 
  return http.get<any>(`sys/role/`, data)
}

export function getRoleById(data: any) { 
  return http.get<any>(`sys/role/${data.id}/`, data)
}

export function addRole(data: any) { 
  return http.post<any>(`sys/role/`, data)
}

export function updateRole(data: any) { 
  return http.put<any>(`sys/role/${data.id}/`, data)
}

export function deleteRole(data: any) {
  return http.delete<any>(`sys/role/${data.id}/`, data)
}

export function deleteRoleBatch(data: any) { 
  return http.delete<any>(`sys/role/multiple_delete/`, data)
}

export function roleAddMenu(data: any) { 
  return http.put<any>(`sys/role/${data.id}/add_menu`, data)
}

export function roleDeleteMenu(data: any) { 
  return http.put<any>(`sys/role/${data.id}/del_menu`,data)
}

export function roleAddPermission(data: any) {
  return http.put<any>(`sys/role/${data.id}/add_permission`,data)
}

export function roleDeletePermission(data: any) {
  return http.put<any>(`sys/role/${data.id}/del_permission`, data)
}

export function getMenuListByRole(data: any) {
  return http.get<any>(`/sys/role_id_to_menu/${data.id}/`, data)
}

