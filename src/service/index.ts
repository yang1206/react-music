import Request from './request'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import type { RequestConfig } from './request/types'
import { message } from 'antd'
export interface IResponse<T> {
  [x: string]: any
  token: any
  statusCode: number
  desc: string
  result: T
}
// 重写返回类型
interface HttpRequestConfig<T, R> extends RequestConfig<IResponse<R>> {
  data?: T
}
const request = new Request({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config: AxiosRequestConfig) => {
      return config
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      return result
    },
    responseInterceptorsCatch: error => {
      error.response && message.error(error.response.data)
      return Promise.reject(new Error(error.response.data))
    }
  }
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {HttpRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const HttpRequest = <D = any, T = any>(config: HttpRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<IResponse<T>>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default HttpRequest
