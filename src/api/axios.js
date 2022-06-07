import axios from 'axios';
import {message} from "ant-design-vue";
import userStore from "../store/userStore";
import router from "../router";

const store = userStore;

function myAxios(axiosConfig, customOptions) {

  let baseUrl = ''
  if (import.meta.env.DEV) {
    baseUrl = 'http://localhost:8601/api/v1';
  } else {
    baseUrl = 'http://goroute.cn:8601/api/v1';
  }
  const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000, // 设置统一的超时时长
  });


  let custom_options = Object.assign({
    repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
    error_message_show: true, // 是否开启接口错误信息展示，默认为 true
    code_message_show: false, // 是否开启code不为0时的信息提示, 默认为false
    default_control_error: true, // 是否开启默认的接口错误控制，默认为true
  }, customOptions);

  service.interceptors.request.use(
    config => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      if (store.getters.getIsLogin === true) {
        config.headers = {
          "access_token": store.getters.getAccessToken
        }
      }
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
      if (response.data && response.data.code !== 0 && custom_options.default_control_error) {
        message.error(response.data.message);
        if (response.data.code === '401') {
          store.commit('logout');
          // router.push({name: 'login'});
        }
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
  let {url, method, params, data} = config;
  if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}

/**
 * 添加key进map中，用于取消请求
 * @param config
 */
function addPending(config) {
  const uniqueKey = getPendingKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(uniqueKey)) {
      pendingMap.set(uniqueKey, cancel);
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
  let msg = '';
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        msg = '接口重定向了！';
        break;
      case 400:
        msg = '参数不正确！';
        break;
      case 401:
        msg = '您未登录，或者登录已经超时，请先登录！';
        break;
      case 403:
        msg = '您没有权限操作！';
        break;
      case 404:
        msg = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        msg = '请求超时！';
        break;
      case 409:
        msg = '系统已存在相同数据！';
        break;
      case 500:
        msg = '服务器内部错误！';
        break;
      case 501:
        msg = '服务未实现！';
        break;
      case 502:
        msg = '网关错误！';
        break;
      case 503:
        msg = '服务不可用！';
        break;
      case 504:
        msg = '服务暂时无法访问，请稍后再试！';
        break;
      case 505:
        msg = 'HTTP版本不受支持！';
        break;
      default:
        msg = '异常问题，请联系管理员！';
        break
    }
    message.error(msg)
  }
}


export default myAxios;
