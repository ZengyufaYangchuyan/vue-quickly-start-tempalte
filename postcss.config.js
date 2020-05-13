/**
 * 自动添加css前缀
 */
const autoprefixer = require('autoprefixer');
/**
 * 生成雪碧图
 */
const { openSprites, sprites } = require('./config/webpack/sprites');

/**
 *
 * @param {Object} file extname, dirname, basename
 */
// eslint-disable-next-line no-unused-vars
const getConfig = ({ file, options, env }) => {
  console.log(file, options, env);
  return {
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: [
      ...(openSprites ? [sprites()] : []),
      autoprefixer
    ]
  };
};

module.exports = getConfig;
