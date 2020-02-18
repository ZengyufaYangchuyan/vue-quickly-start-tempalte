const entry = require('./entry');
const plugins = require('./plugins');
const module  = require('./module');
const { config: output } = require('./output');

/**
 * @namespace
 * @description webpack配置
 * @property {Object} config.entry 入口
 * @property {Object} config.plugins 插件
 * @property {Object} config.module 模块
 * @property {Object} config.output 输出
 */
let config = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'developement',
    entry,
    plugins,
    module,
    output
};

export default config;