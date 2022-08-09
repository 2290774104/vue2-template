import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  Canceler,
  Method
} from 'axios';
import type { RequestConfig, RequestInterceptors, PendingType } from './types';

const pending: Array<PendingType> = [];

const CancelToken = axios.CancelToken;

const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: PendingType = pending[key];
    if (
      item.url === config.url &&
      item.method === config.method &&
      JSON.stringify(item.params) === JSON.stringify(config.params) &&
      JSON.stringify(item.data) &&
      JSON.stringify(config.data)
    ) {
      // 取消请求
      item.cancel();
      // 从请求队列移除
      pending.splice(Number(key), 1);
    }
  }
};

class Request {
  // axios 实列
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;

    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => {
        console.log('全局请求拦截');
        // 如果请求队列中有与本次请求重复的，则取消队列中的请求
        removePending(res);
        // 将本次请求添加进请求队列
        res.cancelToken = new CancelToken((c: Canceler) => {
          pending.push({
            url: res.url,
            method: res.method as Method,
            params: res.params,
            data: res.data,
            cancel: c
          });
        });
        return res;
      },
      (err: any) => err
    );

    // 实例请求拦截
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('全局相应拦截');
        // 请求响应，本次请求结束，移除请求队列
        removePending(res.config);
        return res.data;
      },
      (err: any) => err
    );

    // 实例响应拦截
    this.instance.interceptors.response.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
  }

  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

export default Request;
