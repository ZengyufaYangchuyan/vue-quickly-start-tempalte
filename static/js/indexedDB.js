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
      message: `数据库打开成功：名称：${databaseName} ，已升级到指定的版本号：${version}`
    });
    resovle(event.target.result);
  };
};

/**
 * 获取indexedDB数据库实体
 * @param {String} databaseName 数据库名称
 * @param {Number} version 数据库版本
 */
export const openIndexedDB = ({
  databaseName,
  version = 1,
  success,
  fail
}) => {
  if (!checkIndexedDB()) {
    typeof fail === 'function' && fail({
      databaseName,
      version,
      event: null
    });
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
 */
export const createObjectStore = (indexedDB, tableName, tableConfig) => {
  if (!checkIndexedDB()) {
    return false;
  }
  indexedDB.createObjectStore(tableName, tableConfig);
  return ;
};
