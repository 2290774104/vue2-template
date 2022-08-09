import Vue from 'vue';
import Request from './request';

interface HTTPRequestConfig {
  (url: string, data: any, contentType?: string): any
}

const AJ = 'application/json';
const AXC = 'application/x-www-form-urlencoded;charset=UTF-8';

const request = new Request({
  baseURL: Vue.prototype.$config.baseURL,
  timeout: 60000,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => {
      console.log('通用实例请求拦截器');
      return config;
    },
    // 响应拦截器
    responseInterceptors: result => {
      console.log('通用实例响应拦截器');
      return result;
    }
  }
});

const http = request.instance;

export const $post: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AJ;
  return http({
    method: 'post',
    url,
    data,
    headers: { 'Content-Type': ct }
  });
};

export const $get: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AXC;
  data = data || {};
  return http({
    method: 'get',
    url,
    params: data,
    headers: {
      'Content-Type': ct
    }
  });
};

export const $delete: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AXC;
  data = data || {};
  return http({
    method: 'delete',
    url,
    params: data,
    headers: {
      'Content-Type': ct
    }
  });
};

export const $put: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AJ;
  data = data || {};
  return http({
    method: 'put',
    url,
    data,
    headers: { 'Content-Type': ct }
  });
};

export const $getBlob: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AXC;
  data = data || {};
  return http({
    method: 'get',
    url,
    params: data,
    responseType: 'blob',
    headers: {
      'Content-Type': ct
    }
  });
};

export const $postBlob: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AJ;
  return http({
    method: 'post',
    url,
    data,
    responseType: 'blob',
    headers: { 'Content-Type': ct }
  });
};

export const $postArraybuffer: HTTPRequestConfig = function(
  url,
  data,
  contentType
) {
  const ct = contentType || AJ;
  return http({
    method: 'post',
    url,
    data,
    responseType: 'arraybuffer',
    headers: { 'Content-Type': ct }
  });
};
