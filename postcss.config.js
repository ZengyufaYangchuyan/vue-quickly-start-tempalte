/**
 * 自动添加css前缀
 */
const autoprefixer = require('autoprefixer');
/**
 * 生成雪碧图
 */
const {openSprites, sprites} = require('./config/webpack/sprites');

/**
 *
 * @param {Object} file extname, dirname, basename
 */
const getConfig = ({ file, options, env}) => {
    return {
        parser: file.extname === '.sss' ? 'sugarss' : '',
        plugins: [
            ...(openSprites ? [sprites()] : []),
            autoprefixer
        ]
    };
}

module.exports = getConfig;
