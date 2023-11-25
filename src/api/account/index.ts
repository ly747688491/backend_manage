import http from '@/utils/https'

export function getAccountList(data: any) {
  return http.get<any>('acc/account/', data)
}
export function addAccount(data: any) { 
  return http.post<any>('acc/account/', data)
}

export function getAccountDetailByID(data: any) {
  return http.get<any>(`acc/account/${data.id}/`, data)
}

export function updateAccount(data: any) { 
  return http.put<any>(`acc/account/${data.id}/`, data)
}

export function delateAccount(data: any) { 
  return http.delete<any>(`acc/account/${data.id}/`, data)
}


export function getGroupList(data: any) {
  return http.get<any>(`acc/group/`, data)
}

export function addGroup(data: any) { 
  return http.post<any>(`acc/group/`, data)
}

export function getGroupDetailByID(data: any) { 
  return http.get<any>(`acc/group/${data.id}/`, data)
}

export function updateGroup(data: any) {
  return http.put<any>(`acc/group/${data.id}/`, data)
}

export function delateGroup(data: any) { 
  return http.delete<any>(`acc/group/${data.id}/`, data)
}