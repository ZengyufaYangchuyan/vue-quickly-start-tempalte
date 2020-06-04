const rules = require('./config/webpack/rules');
const plugins = require('./config/webpack/plugins');
const devServer = require('./config/webpack/devServer');
const path = require('path');
const {setAssetsDir} = require('./config/webpack/common');

/**
 * 自动启用模式
 * @description 根据传入的环境变量，设定当前模式，webpack会自动启用某些插件
 * @example 'production' 'development' 'none'
 */
const mode = process.env.NODE_ENV;

/**
 * 当前开发的模式
 * @description 产品发布或者产品研发阶段
 */
const isProduction = mode === 'production';

/**
 * 此选项控制是否生成，以及如何生成 source map
 * @type {string}
 * @link http://cheng.logdown.com/posts/2016/03/25/679045
 * @example 'cheap-module-source-map' 'cheap-module-eval-source-map'
 */
const devtool = isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map';

/**
 * 起点或是应用程序的起点入口
 * @description 从这个起点开始，应用程序启动执行。
 * 如果传递一个数组，那么数组的每一项都会执行。
 */
const entry = {
  main: setAssetsDir('src/main.js')
};

/**
 * 项目打包后基础地址
 */
const baseBuildPath = setAssetsDir('dist');

/**
 * 输出
 * @description 指示 webpack 如何去输出、以及在哪里输出你的
 * bundle、asset 和其他你所打包或使用 webpack 载入的任何内容。
 */
const output = {
  filename: `js/[name]_[chunkhash].js`,
  path: baseBuildPath,
  publicPath: '/'
};

/**
 * 如何处理项目中的不同类型的模块
 */
const modules = {
  /**
   * 防止 webpack 解析那些任何与给定正则表达式相匹配的文件
   * @description 忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。
   * 忽略大型的 library 可以提高构建性能。
   */
  noParse: function (content) {
    return /jquery|loadsh/.test(content);
  },
  rules
};

/**
 * 配置模块如何解析
 */
const resolve = {
  /**
   * 起别名
   * @description 创建 import 或 require 的别名，来确保模块引入变得更简单
   * @example
   * js module 中： @import "@/style/theme"
   * css module 中： @import "~@/style/theme"
   * css 属性中： background: url("~@/assets/xxx.jpg")
   * html 标签中： <img src="~@/assets/xxx.jpg" alt="alias">
   */
  alias: {
    vue$: "vue/dist/vue.esm.js",
    pages: setAssetsDir('src/pages'),
    images: setAssetsDir('static/images'),
    sprites: setAssetsDir('static/images/sprites'),
    js: setAssetsDir('static/js'),
    config: path.resolve(__dirname, './config')
  },
  /**
   * 自动解析规定的扩展
   * @description 能够使开发人员在引入模块时不带扩展
   */
  extensions: ['.vue', '.ts', ".tsx", '.js']
};

/**
 * 构建指定环境
 * @description 告知 webpack 为目标(target)指定一个环境
 */
const target = 'web';

/**
 * 配置如何展示性能提示
 * @description 例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
 */
const performance = {
  /**
   * 打开/关闭提示
   * @description 当找到提示时，告诉 webpack 抛出一个错误或警告
   * @default 'warning'
   */
  hints: isProduction ? 'error' : 'warning',
  /**
   * 入口最大大小
   * @description 此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示。
   * @type {Int}
   * @default 250000
   */
  maxEntrypointSize: 250000,
  /**
   * 资源(asset)是从 webpack 生成的任何文件
   * @description 此选项根据单个资源体积，控制 webpack 何时生成性能提示
   * @type {Int}
   * @default 250000
   */
  maxAssetSize: 250000,
  /**
   * 此属性允许 webpack 控制用于计算性能提示的文件
   * @param {*} assetFilename 生成文件的名字
   */
  assetFilter: function (assetFilename) {
    return !(/\.map$/.test(assetFilename));
  }
};

/**
 * 分割JS代码，用于缓存长效代码
 */
const splitChunks = {
  chunks: "all",
  minSize: 30000,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '_',
  name: true,
  cacheGroups: {
    vendors: {
      name: 'vendors',
      test: /[\\/]node_modules[\\/]/,
      priority: -10
    },
    default: {
      name: 'default',
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    }
  }
};

/**
 * 在构建代码中移出manifest，避免构建时更新不必要的代码
 */
const runtimeChunk = {
  name: 'manifest'
};

let config = {
  mode,
  devtool,
  entry,
  output,
  module: modules,
  resolve,
  target,
  devServer,
  plugins,
  performance,
  optimization: {
    splitChunks,
    runtimeChunk
  }
};

module.exports = config;
