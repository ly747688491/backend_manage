import http from '@/utils/https'

export function getCompanyList(data: any) {
  return http.get<any>(`com/company/`, data)
}

export function addCompany(data: any) { 
  return http.post<any>(`com/company/`, data)
}

export function getCompanyDetailById(data: any) {
  return http.get<any>(`com/company/${data.id}`,data)
}

export function updateCompany(data: any) { 
  return http.put<any>(`com/company/${data.id}/`, data)
}

export function deleteCompany(data: any) { 
  return http.delete<any>(`com/company/${data.id}/`,data)
}


export function deleteCompanyBatch(data: any) { 
  return http.delete<any>(`com/service/multiple_delete/`,data)
}

export function getIamgeList(data: any) {
  return http.get<any>(`com/image/`, data)
}

export function addImage(data: any) { 
  return http.post<any>(`com/image/`, data)
}

export function getImageDetailById(data: any) {
  return http.get<any>(`com/image/${data.id}`,data)
}

export function updateImage(data: any) { 
  return http.put<any>(`com/image/${data.id}/`, data)
}

export function deleteImage(data: any) { 
  return http.delete<any>(`com/image/${data.id}/`,data)
}

export function deleteImageBatch(data: any) {
  return http.delete<any>(`com/image/multiple_delete/`,data)
}

export function getServiceList(data: any) {
  return http.get<any>(`com/service/`, data)
}

export function addService(data: any) { 
  return http.post<any>(`com/service/`, data)
}

export function getServiceDetailById(data: any) {
  return http.get<any>(`com/service/${data.id}`,data)
}

export function updateService(data: any) { 
  return http.put<any>(`com/service/${data.id}/`, data)
}

export function deleteService(data: any) { 
  return http.delete<any>(`com/service/${data.id}/`, data)
}

export function deleteServiceBatch(data: any) {
  return http.delete<any>(`com/service/multiple_delete/`,data)
}