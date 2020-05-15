const path = require('path');

/**
 * 设置文件路径
 * @param {String} _path 基于项目根目录下的文件夹地址
 * @return {String} path
 */
const setAssetsDir = (_path) => {
  return path.resolve(__dirname, `../../${_path}`);
};

module.exports = {
  setAssetsDir
};
