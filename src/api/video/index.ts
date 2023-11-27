import http from '@/utils/https'

export function getHotspotList(params: any) {
    return http.get(`video/hotspots/today/`, params)
}

export function getVideoList(params: any) { 
  return http.get(`video/video/`, params)
}

export function getVideoDetailById(params: any) { 
  return http.get(`video/video/${params.id}/`, params)
}

export function addVideo(params: any) {
  return http.post(`video/video/`, params)
}

export function updataVideo(params: any) {
  return http.put(`video/video/${params.id}/`, params)
}

export function delateVideo(params: any) { 
  return http.delete(`video/video/${params.id}/`, params)
}

export function delateVideoBatch(params: any) {
  return http.delete(`video/video/multiple_delete/`, params)
}