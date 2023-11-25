/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-25 10:53:08
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-25 13:43:58
 * @Description: 
 */
/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-25 10:53:08
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-25 10:53:37
 * @Description: 对axios的封装
 */
import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import { ResultEnum } from '@/enums/httpEnums'
import type { PageResponse, DetailResponse, ErrorResponse } from './types'
import { LOGIN_URL } from '@/config/config'
import { RESEETSTORE } from '../reset'
import router from '@/router'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: ResultEnum.TIMEOUT as number
})

/**
 * @description: 请求拦截器
 * @returns {*}
 */
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const { token } = userStore
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error: AxiosError) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)
/**
 * @description: 响应拦截器
 * @returns {*}
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    // * 登陆失效（code == 203）
    if (data.code === ResultEnum.EXPIRE || data.code === ResultEnum.OVERDUE) {
      RESEETSTORE()
      ElMessage.error(data.message || ResultEnum.ERRMESSAGE)
      router.replace(LOGIN_URL)
      return Promise.reject(data)
    }

    if (data.code && data.code !== ResultEnum.SUCCESS) {
      ElMessage.error(data.message || ResultEnum.ERRMESSAGE)
      return Promise.reject(data)
    }
    return data
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }

    ElMessage.error(message)
    return Promise.reject(error)
  }
)

/**
 * @description: 导出封装的请求方法
 * @returns {*}
 */
const http = {
  get<T>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<PageResponse<T> | DetailResponse<T> | ErrorResponse> {
    return service.get(url, { params, ...config })
  },

  post<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<PageResponse<T> | DetailResponse<T> | ErrorResponse> {
    return service.post(url, data, config)
  },

  put<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<PageResponse<T> | DetailResponse<T> | ErrorResponse> {
    return service.put(url, data, config)
  },

  delete<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<PageResponse<T> | DetailResponse<T> | ErrorResponse> {
    return service.delete(url, { data, ...config })
  }
}

export default http
