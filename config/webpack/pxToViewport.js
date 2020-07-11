const postCssPxToViewport = require('postcss-px-to-viewport');

/**
 * 基础配置
 * @description 在移动项目中开启，可以兼容多个移动端，需要根据设计稿的进行配置
 */
const pxToViewportConfig = {
  /**
   * 是否开启转换
   */
  open: true,
  /**
   * 配置参数
   */
  options: {}
};

/**
 * 默认配置
 */
const defaultsOptions = {
  unitToConvert: 'px',
  viewportWidth: 1024,
  viewportHeight: 768, // not now used; TODO: need for different units and math for different properties
  unitPrecision: 5,
  viewportUnit: 'vw',
  fontViewportUnit: 'vw',  // vmin is more suitable.
  selectorBlackList: [],
  propList: ['*'],
  minPixelValue: 1,
  mediaQuery: false,
  replace: true,
  landscape: false,
  landscapeUnit: 'vw',
  landscapeWidth: 568
};

module.exports = {
  open: pxToViewportConfig.open,
  pxToViewport: () => {
    let options = JSON.stringify(pxToViewportConfig.options) === '{}' ? defaultsOptions : pxToViewportConfig.options;
    return postCssPxToViewport(options);
  }
};
