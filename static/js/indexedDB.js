import common from 'js/common';
/**
 * indexedDB
 * 浏览器数据库
 * @author zengyufa<@email: zengyufayangchuyan@outlook.com>
 * Can I Use @link https://caniuse.com/#search=indexedDB
 */

/**
 * 检查当前浏览器是否存在indexdeDB
 * @returns {Boolean}
 */
const checkIndexedDB = () => {
  let existIndexedDB = !!window.indexedDB;
  if (!existIndexedDB) {
    common.message(`当前浏览器不存在indexedDB，无法使用！`);
  }
  return existIndexedDB;
};

/**
 * 打开指定indexedDB数据库实体失败
 * @param {Object} indexedDB 正在打开的indexedDB
 * @param {String} databaseName 数据库名字
 * @param {Number} version 版本号
 * @return null
 */
const openIndexedDBError = (indexedDB, databaseName, version, reject) => {
  // eslint-disable-next-line no-unused-vars
  return indexedDB.onerror = (event) => {
    common.message(`数据库打开错误：名称：${databaseName} ，版本号：${version}`);
    reject({
      databaseName,
      version,
      event
    });
  };
};

/**
 * 打开指定indexedDB数据库成功
 * @param {Object} indexedDB 正在打开的indexedDB
 * @param {String} databaseName 数据库名字
 * @param {Number} version 版本号
 * @return result
 */
const openIndexedDBSuccess = (indexedDB, databaseName, version, resovle) => {
  // eslint-disable-next-line no-unused-vars
  return indexedDB.onsuccess = (event) => {
    common.message({
      type: 'success',
      message: `数据库打开成功：名称：${databaseName} ，版本号：${version}`
    });
    resovle(indexedDB.result);
  };
};

/**
 * 打开指定indexedDB数据库成功，但需要升级到指定版本
 * @param {Object} indexedDB 正在打开的indexedDB
 * @param {String} databaseName 数据库名字
 * @param {Number} version 版本号
 */
const openIndexedDBUpgradeneeded = (indexedDB, databaseName, version, resovle) => {
  return indexedDB.onupgradeneeded = (event) => {
    common.message({
      type: 'success',
      message: `第一次打开数据库或升级成功：名称：${databaseName} ，已升级到指定的版本号：${version}`
    });
    resovle(event.target.result);
  };
};

/**
 * 获取indexedDB数据库实体
 * @param {String} databaseName 数据库名称
 * @param {Number} version 数据库版本
 * @param {Function} success 成功回调函数
 * @param {Function} fail 失败回调函数
 */
export const openIndexedDB = ({
  databaseName,
  version = 1,
  success,
  fail
}) => {
  if (!checkIndexedDB()) {
    typeof fail === 'function' && fail(false);
    return;
  }

  let openIndexedDBPromise = new Promise((resovle, reject) => {
    // 打开数据库连接
    const indexedDB = window.indexedDB.open(databaseName, version);
    // 打开数据库成功
    openIndexedDBSuccess(indexedDB, databaseName, version, resovle);
    // 打开数据库成功 - 需要升级
    openIndexedDBUpgradeneeded(indexedDB, databaseName, version, resovle);
    // 打开数据库错误
    openIndexedDBError(indexedDB, databaseName, version, reject);
  });

  openIndexedDBPromise.then(result => {
    typeof success === 'function' && success(result);
  }).catch(error => {
    typeof fail === 'function' && fail(error);
  });
};

/**
 * 对数据库进行新建指定表
 * @description 根据给定数据中是否存在给定名称的表，进行创建表操作
 * @param {Object} obj 参数对象
 * @param {IDBOpenDBRequest} obj.indexedDB 数据库
 * @param {String} obj.tableName 表名称
 * @param {IDBObjectStoreParameters} obj.tableConfig
 * @param {IDBTransactionMode} obj.mode 模式：readonly / readwrite，此项只在当前所创建的表已经存在时起作用
 * @param {Function} obj.success 成功回调
 * @param {Function} obj.fail 失败回调
 */
export const createObjectStore = (obj) => {
  let {indexedDB, tableName, tableConfig, mode = 'readwrite', success, fail } = obj;
  if (!checkIndexedDB()) {
    typeof fail === 'function' && fail(false);
    return;
  }
  let objectStore = null;
  if (!indexedDB.objectStoreNames.contains(`${tableName}`)) {
    objectStore = indexedDB.createObjectStore(tableName, tableConfig);
  } else {
    objectStore = indexedDB.transaction(tableName, mode).objectStore(tableName);
  }
  typeof success === 'function' && success(objectStore);
};

/**
 * 新增表数据成功
 * @param {IDBRequest} IDBRequest 请求
 * @param {Function} resovle 成功回调
 */
const addIndexDBSuccess = (IDBRequest, resovle) => {
  return IDBRequest.onsuccess = (event) => {
    resovle(event);
  };
};

/**
 * 新增表数据失败
 * @param {IDBRequest} IDBRequest 请求
 * @param {Function} reject 拒绝回调
 */
const addIndexDBError = (IDBRequest, reject) => {
  return IDBRequest.onerror = (event) => {
    reject(event);
  };
};

/**
 * 新增表数据
 * @description 给指定的数据库下的指定表新增数据（需要指定tableName）或给指定的表新增数据
 * @param {Object} obj 参数对象
 * @param {IDBOpenDBRequest} obj.indexedDB 数据库
 * @param {String} obj.tableName 表名称
 * @param {IDBTransactionMode} obj.mode 模式：readonly / readwrite，此项只在当前所创建的表已经存在时起作用
 * @param {IDBObjectStore} obj.objectStore 表
 * @param {any} obj.value 表字段值
 * @param {String} obj.key 表字段名
 * @param {Function} obj.success 成功回调
 * @param {Function} obj.fail 失败回调
 */
export const indexedDBAdd = (obj) => {
  let {indexedDB, tableName, mode, objectStore, value, key, success, fail} = obj;
  if (!checkIndexedDB()) {
    typeof fail === 'function' && fail(false);
    return;
  }
  let store = null;
  // 根据入参结构
  if (indexedDB) {
    // 指定数据库下，指定的表名
    store = indexedDB.transaction(tableName, mode).transaction(tableName);
  } else if (objectStore) {
    // 已经给定了表
    store = objectStore;
  }

  // 插入数据
  if (store) {
    const indexedDBAddRequest = new Promise((resovle, reject) => {
      let addRequest = store.add(value, key);
      addIndexDBSuccess(addRequest, resovle);
      addIndexDBError(addRequest, reject);
    });
    indexedDBAddRequest.then((res) => {
      typeof success === 'function' && success(res);
    }).catch((res) => {
      typeof fail === 'function' && fail(res);
    });
  } else {
    typeof fail === 'function' && fail(false);
  }
};
