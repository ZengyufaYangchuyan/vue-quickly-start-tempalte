const HtmlWebpackPluginConfig = require('./html');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

/**
 * 是否为产品
 * @type {boolean}
 */
let isProduction = process.env.NODE_ENV === 'production';

/**
 * webpack 插件列表
 */
let plugins = [
  /**
   * 在每次构建的时候清除之前构建的文件
   */
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new webpack.HashedModuleIdsPlugin({
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 20
  }),
  /**
   * 指定html模板和设置生成模板规则
   */
  new HtmlWebpackPlugin(HtmlWebpackPluginConfig),
  /**
   * 将css内容拆分成独立的文件引入模板中
   */
  ...(isProduction ? [new MiniCssExtractPlugin({
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[id].[hash].css',
  })] : [])
];

module.exports = plugins;
