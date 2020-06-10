import axios from 'axios';
import common from 'js/common';
import {formatDate} from 'js/format.js';
import {openIndexedDB, createObjectStore, addIndexedDB} from 'js/indexedDB';
import IP from 'config/serverIP';

window.IPConfig = {
  IP
};

// /**
//  * 记录请求错误
//  * @type {Array}
//  */
// window.HttpRequest = {
//   success: [],
//   error: []
// };

/**
 * 默认配置
 * @description 在调用Vue.$http方法中未使用对应项参数时，将会以以下对应项参数进行配置
 * @type {Object}
 */
const baseConfig = {
  /**
   * 基础访问路径
   * @type {String}
   */
  baseURL: window.IPConfig.IP,
  /**
   * 后端API地址
   * @type {String}
   */
  url: '',
  /**
   * 默认请求方式
   * @type {String}
   */
  method: 'GET',
  /**
   * 是否不需要token
   * @type {Boolean}
   */
  noToken: false,
  /**
   * 连接超时时间
   * @type {Number}
   */
  timeout: 3000,
  /**
   * 请求头
   * @type {Object}
   */
  headers: {},
  /**
   * 是否访问已缓存的接口
   * @type {Boolean}
   */
  cache: false,
  /**
   * 是否不做后端返回code数据状态码校验
   * @type {Boolean}
   * @example
   * 后端格式为: { data: '', msg: '', code: 200 }
   */
  breakCode: false,
  /**
   * 请求数据的数据类型
   * @description 此处只存在当 requsetDataType 为 formData 时，对应处理方法
   * @type {String}
   */
  requsetDataType: '',
  /**
   * 是否返回一个Promise
   * @type {Boolean}
   */
  returnPromise: false,
  /**
   * 成功回调
   * @type {Function}
   */
  success: () => {},
  /**
   * 失败回调
   * @type {Function}
   */
  fail: () => {},
  /**
   * 最终处理方法
   * @type {Function}
   */
  complete: () => {},
  /**
   * 在没有匹配到指定code的时候，调用此方法
   * @type {Function}
   */
  otherCodeSuccess: () => {}
};

/**
 * 成功回调
 * @function
 * @param
 */
const successFn = (
  res,
  {
    breakCode,
    success,
    otherCodeSuccess
  }
) => {
  let {msg, code} = res;
  if (breakCode && typeof success === 'function') {
    return success(res);
  }
  switch (code) {
  case 200:
    typeof success === 'function' && success(res);
    break;
  case 401:
    common.message(`code:401  ${msg}`);
    break;
  case 403:
    common.message(`code:403  ${msg}`);
    break;
  default:
    typeof otherCodeSuccess === 'function' && otherCodeSuccess(res);
    break;
  }
};

/**
 * 失败回调
 * @function
 * @param
 */
const failFn = (
  res,
  {
    fail,
    timeStamp,
    requsetType,
    requestConfig
  }
) => {
  // // 记录错误信息
  // window.HttpRequest.error.push({
  //   time: JSON.stringify(common.formatDate(timeStamp)),
  //   request: requestConfig,
  //   response: res
  // });
  let databaseName = 'httpRequest', version = 1, tableName = 'error', mode = 'readwrite';
  openIndexedDB({
    databaseName,
    version
  }).then(result => {
    return createObjectStore({
      indexedDB: result,
      tableName,
      tableConfig: {
        keyPath: 'id',
        autoIncrement: true
      },
      mode
    });
  }).then(result => {
    let {isNew, objectStore} = result;
    if (isNew) {
      let tableIndexs = [
        {
          name: 'time',
          keyPath: 'time',
          options: {
            unique: false
          }
        },
        {
          name: 'request',
          keyPath: 'request',
          options: {
            unique: false
          }
        },
        {
          name: 'response',
          keyPath: 'response',
          options: {
            unique: false
          }
        },
        {
          name: 'requsetType',
          keyPath: 'requsetType',
          options: {
            unique: false
          }
        }
      ];
      tableIndexs.forEach(item => {
        let {name, keyPath, options} = item;
        objectStore.createIndex(name, keyPath, options);
      });
    }
    return addIndexedDB({
      objectStore,
      value: {
        requsetType,
        time: timeStamp,
        request: requestConfig,
        response: res
      }
    });
  }).then(result => {
    console.log(`错误数据已经添加至indexedDB: ${databaseName}`, result);
  }).catch(error => {
    console.log(error);
  });
  if (typeof fail === 'function') {
    return fail(res);
  }
};

/**
 * 处理完最终操作
 * @function
 * @param
 */
const completeFn = (
  res,
  {
    timeStamp,
    requestConfig
  }
) => {
  console.log(formatDate(timeStamp), requestConfig, res);
};

/**
 * 接口请求
 * @function
 * @param {String} config.baseURL 基础路径
 * @param {String} config.url 后端API地址
 * @param {String} config.method 请求方式 默认为 GET
 * @param {Boolean} config.noToken 为true时请求头不需要带token，默认带token
 * @param {Object} config.headers 请求头参数
 * @param {Number} config.timeout 请求超时时间
 * @param {Boolean} config.returnPromise 是否只需返回一个promise，只在 requestType 不为 formData 时有效
 * @param {Boolean} config.breakCode 是否打断code校验，成功时不会做后端返回code校验
 * @param {String} config.requsetType 设置 requestType ，当前只在 requestType 为formData 时存在相应处理方式
 * @param {Function} config.success 成功回调函数
 * @param {Function} config.fail 错误回调函数
 * @param {Function} config.complete promise完成回调函数
 * @param {Function} config.otherCodeSuccess code不在指定范畴内，设置的回调函数，详情情况 successFn
 */
const http = (config) => {
  let {
    baseURL = baseConfig.baseURL,
    url = baseConfig.url,
    method = baseConfig.method,
    noToken = baseConfig.noToken,
    cache = baseConfig.cache,
    timeout = baseConfig.timeout,
    returnPromise = baseConfig.returnPromise,
    breakCode = baseConfig.breakCode,
    requsetType = baseConfig.requsetType,
    headers = {},
    data = {},
    formData = new FormData(),
    params = {},
    success,
    fail,
    complete,
    otherCodeSuccess
  } = config;
  // 获取token
  let token = common.getToken();

  // 设置headers
  headers = Object.assign(
    baseConfig.headers,
    headers,
    (noToken ? {} : {token})
  );

  // 时间戳用于记录或提示请求发生时间
  let timeStamp = new Date();

  // 设置请求参数
  params = cache ? {} : { _ : timeStamp };
  if (method.toLowerCase() === 'get') {
    params = Object.assign(
      params,
      data
    );
  }

  // axios基础配置
  let axiosConfig = {
    baseURL,
    url,
    headers,
    method,
    timeout,
    data,
    params
  };

  // 下一步处理需要数据
  let nextHandleConfig = {
    timeStamp,
    breakCode,
    requsetType,
    // 请求配置
    requestConfig: axiosConfig,
    // 对应回调
    success,
    fail,
    complete,
    otherCodeSuccess
  };

  // 使用 formData 上传数据
  if (requsetType === 'formData') {
    let config = {
      headers: { 'Content-Type': 'multipart/form-data', token }
    };
    url = `${baseURL}/${url || ''}?token=${token}&_${timeStamp}`;
    return axios.post(url, formData, config).then(res => {
      successFn(res, nextHandleConfig);
    }).catch(res => {
      failFn(res, nextHandleConfig);
    }).finally(res => {
      completeFn(res, nextHandleConfig);
    });
  }

  return returnPromise ? axios(axiosConfig) : axios(axiosConfig).then(res => {
    successFn(res, nextHandleConfig);
  }).catch(res => {
    failFn(res, nextHandleConfig);
  }).finally(res => {
    completeFn(res, nextHandleConfig);
  });
};

export default {
  install (Vue) {
    Vue.prototype.$http = http;
    Vue.prototype.$axios = axios;
  }
};
