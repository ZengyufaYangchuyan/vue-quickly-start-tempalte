const entry = require('./entry');
const plugins = require('./plugins');
const rules  = require('./rules');
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
    entry,
    plugins,
    module: {
        rules
    },
    output
};

export default config;