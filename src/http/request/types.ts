import type { AxiosRequestConfig, AxiosResponse, Canceler, Method } from 'axios';

export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 相应拦截
  responseInterceptors?: <T = AxiosResponse>(config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
}

export interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: Canceler
}
