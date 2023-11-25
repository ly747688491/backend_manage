import http from '@/utils/https'

export function getCompanyList(data: any) {
  return http.get<any>(`/com/company/`, data)
}

