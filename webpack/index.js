const {entry} = require('./entry')
const {output} = require('./output')
/**
 * 模式
 * @type {string}
 * @example production | developement
 */
const mode = process.env.NODE_ENV;

/**
 * 是否为开发模式
 * @type {Boolean}
 */
const isProduction = mode === 'production';

/**
 * 此选项控制是否生成，以及如何生成 source map
 * @type {string}
 * @link http://cheng.logdown.com/posts/2016/03/25/679045
 * @example cheap-module-source-map | cheap-module-eval-source-map
 */
const devtool = isProduction ? 'cheap-module-source-map' : 'cheap-module-eval-source-map';

let config = {
    mode,
    devtool,
    entry,
    output
};

console.log(config);

module.exports = config;