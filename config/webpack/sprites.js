const path = require('path');
const { SrcStaticImagesSpritesDir, BuildStaticImagesSpritesDir } = require('./direction');
const sprites = require('postcss-sprites');

/**
 * 基础配置
 */
const spritesConfig = {
  /**
   * 是否开启生成雪碧图
   */
  open: true,
  /**
   * 生成雪碧图配置
   */
  config: {
    /**
     * 用于样式表中url中使用相对路径的地址
     * @description 用于在使用相对路径加载文件时，生成绝对路径
     * @type string
     * @default './'
     */
    basePath: SrcStaticImagesSpritesDir,
    /**
     * 需要生成雪碧图的标识路径
     * @description 图标文件的目录路径。以路径作为区分图标与非图标资源的标识，也就是说参与自动sprites的图标文件必须存放于独立的目录下
     * @type string
     * @default undefined
     */
    dir: 'src/static/images/sprites',
    /**
     * 生成文件后存放雪花图的地址
     */
    spritePath: BuildStaticImagesSpritesDir,
    /**
     * 默认分组名称
     * @description 将所有需要生成雪碧图的合成后的文件名
     * @type string
     * @default {string} icons
     */
    defaultGroupName: 'icons',
    /**
     * 是否识别子目录并且每个子目录分别编译为sprites图片
     * @description 如上述代码对应的项目中存在图标目录'assets/image/icons'，在此目录下又存在两个子目录'assets/image/icons/index'和'assets/image/icons/admin'，分别存在index页面和admin页面的图标文件。如果配置split:true，将会编译输出两个sprites图片sprite.index.png和sprite.admin.png；如果配置split:false，boi只会编译输出一个sprites图片文件sprite.icons.png
     * @type boolean
     * @default true
     */
    split: true,
    /**
     * 需要生成雪花图的文件后缀
     * @type array|string
     * @default ''
     */
    extType: ['png', 'jpeg'],
    /**
     * 是否识别分辨率标识
     * @description 分辨率标识指的是类似@2x的文件名标识，比如存在两个图标文件logo.png和logo@2x.png并且style文件中对两张图标都有引用，如果配置`retina:true`，将把两种分辨率的图片分别合并为一张sprites图片，否则会编译到同一张sprites图片里
     * @type boolean
     * @default true
     */
    retina: true,
    /**
     * 提供给用户自定义postcss-sprites相关功能的
     * @description 如果遇到上文提到的配置项不能满足的应用场景，用户可以通过此API直接对postcss-sprites进行配置。
     * @type object
     * @default null
     */
    options: null,
    /**
     * 打印输出开关
     * @description 在生成雪花图时，是否打印输出
     * @type boolean
     * @default true
     */
    verbose: true
  }
};
let { dir, extType } = spritesConfig.config || {};

/**
 * 路径校验正则，只有在满足规定的路径才能进行下一步处理
 */
const REG_SPRITES_NAME = new RegExp(
  [
    path.posix.normalize(dir).replace(/^\.*/, '').replace(/\//, '\\/'),
    '\\/\\.+\\.',
    extType instanceof Array ? '(' + extType.join('|') + ')' : extType,
    '\\$'
  ].join(''),
  'i'
);

/**
 * 过滤函数，是否需要生成雪碧图
 * @param {Object} image
 * @param {string} image.path
 * @param {string} image.url 将originalUrl经过标准化处理后得到的url地址，即移除了参数等配置数据的地址
 * @param {string} image.originalUrl 在css中引入的原始url地址包含了参数等配置数据
 * @param {string} image.retina 是否开启视网膜像素标记
 * @param {string} image.ratio 视网膜像素标记开始下，图片像素倍数
 * @param {Array} image.groups 图片所属分组
 * @param {string} image.token
 * @param {string} image.styleFilePath
 * @returns Promise.reject|Promise.resovle
 */
const filterBy = (image) => {
  let { url } = image;
  if (!REG_SPRITES_NAME.test(url)) {
    return Promise.reject();
  }
  return Promise.resolve();
};

/**
 * 合法的散列图path
 */
const REG_SPRITES_PATH = new RegExp(
  [
    path.posix.normalize(dir).replace('/^\\.*/', '').replace(/\//, '\\/'),
    '\\/(.*?)\\/'
  ].join(''),
  'i'
);

/**
 * 合法的retina标识
 */
const REG_SPRITES_RETINA = new RegExp(
  [
    '@(\\d+)x\\.',
    extType instanceof Array ? '(' + extType.join('|') + ')' : extType
  ].join(''),
  'i'
);

/**
 * 分组函数，
 * @param {Object} image
 * @param {string} image.path
 * @param {string} image.url
 * @param {string} image.originalUrl
 * @param {string} image.retina
 * @param {string} image.ratio
 * @param {Array} image.groups
 * @param {string} image.token
 * @param {string} image.styleFilePath
 * @returns Promise.reject|Promise.resovle
 */
const groupBy = (image) => {
  let { url } = image;
  let groups = null;
  let groupName = undefined;
  let { split = false, defaultGroupName = 'icons', retina = false } = spritesConfig.config;
  // 是否需要根据路径进行分割雪花图
  if (split) {
    groups = REG_SPRITES_PATH.exec(url);
    groupName = groups ? groups[1] : defaultGroupName;
  } else {
    groupName = defaultGroupName;
  }
  // 是否需要根据分辨率分割雪花图，同一分辨率会分割到一起
  if (retina) {
    image.retina = true;
    image.ratio = 1;
    let ratio = REG_SPRITES_RETINA.exec(url);
    if (ratio) {
      ratio = ratio[1];
      while (ratio > 10) {
        ratio = ratio / 10;
      }
      image.ratio = ratio;
      image.groups = image.groups.filter((group) => {
        return `@${ratio}x` !== group;
      });
      groupName += `@${ratio}x`;
    }
  }
  return Promise.resolve(groupName);
};

/**
 * 默认生成雪碧图配置，在用户不设置options时应用
 */
const defaultOptions = {
  basePath: spritesConfig.config.basePath,
  filterBy,
  groupBy,
  verbose: spritesConfig.config.verbose,
  spritePath: spritesConfig.config.spritePath
};

module.exports = {
  openSprites: spritesConfig.open,
  /**
   * 对除了外部引入和base64的图片资源，且满足在规定路径下的规定格式图片资源进行雪花图处理
   */
  sprites: () => {
    return sprites(spritesConfig.config.options || defaultOptions);
  }
};
