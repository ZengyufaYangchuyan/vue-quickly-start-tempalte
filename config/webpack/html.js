const {setAssetsDir} = require('./common');

const config = {
  title: 'vue-quickly-start-template',
  /**
   * 生成后模板
   * @description 输出生成后模板在指定位置和指定模板名称
   */
  filename: 'index.html',
  /**
   * 模板地址
   * @description 根据模板地址，加载文件作为模板使用
   */
  template: setAssetsDir('index.html'),
  /**
   * 浏览器标签栏图标
   * @description 根据指定地址和文件设置为当前网站标签栏图标
   */
  favicon: setAssetsDir('static/images/favicon/bowerser-window-logo.jpg'),
  /**
   * 提供有关页面的元信息
   * @description 元数据总是以名称/值的形式被成对传递的
   */
  meta: {
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    author: 'Jzeng<zengyufayangchuyan@outlook.com>'
  },
  /**
   * JS注入位置
   * @description 生成后模板后，将生成JS注入在指定位置
   * @default true
   * @example 'body' | 'header' | true
   */
  inject: 'body'
};

module.exports = config;
