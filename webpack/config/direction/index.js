const path = require('path');

const assetDirName = 'buildAsset';
const assetStaticDirName = 'static';
const assetJsDirName = 'js';
const assetImgDirName = 'images'

const baseDir = path.resolve(__dirname, '../../');
const buildAssetDir = path.resolve(baseDir, `./${assetDirName}`);
const buildAssetStaticDir = path.resolve(buildAssetDir, `./${assetStaticDirName}`);
const buildAssetJsDir = path.resolve(buildAssetStaticDir, `./${assetJsDirName}`);
const buildAssetImgDir = path.resolve(buildAssetStaticDir, `./${assetImgDirName}`);

const config = {
    /**
     * 项目基础地址
     * @type {string}
     * @example ./vue-quickly-start-tempalte/
     */
    baseDir,
    /**
     * 基础文件夹名字
     * @type {string}
     * @example buildAsset
     */
    assetDirName,
    /**
     * 项目打包后，整体文件基础地址
     * @type {string}
     * @example ./vue-quickly-start-tempalte/buildAsset
     */
    buildAssetDir,
    /**
     * 静态文件夹名字
     * @type {string}
     * @example static
     */
    assetStaticDirName,
    /**
     * 项目打包后，整体文件中静态文件地址
     * @type {string}
     * @example ./vue-quickly-start-tempalte/buildAsset/static
     */
    buildAssetStaticDir,
    /**
     * js文件夹名字
     * @type {string}
     * @example ./vue-quickly-start-tempalte/buildAsset/static/js
     */
    assetJsDirName,
    /**
     * 项目打包后，整体文件中js文件地址
     * @type {string}
     * @example ./vue-quickly-start-tempalte/buildAsset/static/js
     */
    buildAssetJsDir,
    /**
     * 图片类型文件夹名字
     * @type {string}
     * @example images
     */
    assetImgDirName,
    /**
     * 项目打包后，整体文件中image文件地址
     * @type {string}
     * @example ./vue-quickly-start-tempalte/buildAsset/static/images
     */
    buildAssetImgDir
};

console.log(JSON.stringify(config));

module.exports = config;