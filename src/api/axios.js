import axios from 'axios';
import {message} from "ant-design-vue";

function myAxios(axiosConfig,customOptions) {
  const service = axios.create({
    baseURL: 'http://localhost:8601', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });


  let custom_options = Object.assign({
    repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
    error_message_show: true, // 是否开启接口错误信息展示，默认为 true
    code_message_show: true, // 是否开启code不为0时的信息提示, 默认为true
  }, customOptions);

  service.interceptors.request.use(
    config => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      return config;
    },
    error => {
      custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    response => {
      removePending(response.config);
      if(custom_options.code_message_show && response.data && response.data.code !== 0) {
        message.error(response.data.message);
        return Promise.reject(response.data); // code不等于0, 页面具体逻辑就不执行了
      }
      return response;
    },
    error => {
      error.config && removePending(error.config);
      custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
      return Promise.reject(error);
    }
  );

  return service(axiosConfig)
}

//存储请求key
const pendingMap = new Map();



/**
 * 生成每个请求独立的key
 * @param config
 * @returns {string}
 */
function getPendingKey(config) {
  let { url,method,params,data } = config;
  if(typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}

/**
 * 添加key进map中，用于取消请求
 * @param config
 */
function addPending(config) {
  const uniqueKey = getPendingKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) =>{
    if (!pendingMap.has(uniqueKey)) {
      pendingMap.set(uniqueKey,cancel);
    }
  })
}

/**
 * 取消正在请求的请求
 * @param config
 */
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
  let message = '';
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！';
        break;
      case 400:
        message = '参数不正确！';
        break;
      case 401:
        message = '您未登录，或者登录已经超时，请先登录！';
        break;
      case 403:
        message = '您没有权限操作！';
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        message = '请求超时！';
        break;
      case 409:
        message = '系统已存在相同数据！';
        break;
      case 500:
        message = '服务器内部错误！';
        break;
      case 501:
        message = '服务未实现！';
        break;
      case 502:
        message = '网关错误！';
        break;
      case 503:
        message = '服务不可用！';
        break;
      case 504:
        message = '服务暂时无法访问，请稍后再试！';
        break;
      case 505:
        message = 'HTTP版本不受支持！';
        break;
      default:
        message = '异常问题，请联系管理员！';
        break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！';
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';
}




export default myAxios;
