/**
 * 自动添加css前缀
 */
const autoprefixer = require('autoprefixer');
/**
 * 生成雪碧图
 */
const { open: openSprites, sprites } = require('./config/webpack/sprites');
/**
 * 像素转换viewport
 */
const { open: openPxToViewport, pxToViewport } = require('./config/webpack/pxToViewport');
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
      autoprefixer,
      ...(openPxToViewport ? [pxToViewport()] : [])
    ]
  };
};

module.exports = getConfig;
