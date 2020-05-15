const path = require('path');

/**
 * 需要生成项目目录结构配置，用于生成相应的目录结构
 */
const pathTreeConfig = [
  [
    'src'
  ],
  [
    'static',
    [
      'css',
      [
        'images',
        [
          'sprites'
        ]
      ],
      'js',
      'font',
      'media'
    ]
  ],
  [
    'config',
    [
      'webpack',
      [
        'postcss',
        [
          'sprites'
        ]
      ]
    ]
  ]
];

/**
 * 设置文件夹名称和路径地址
 * @param {string} parentDir 父文件夹路径
 * @param {Array} config 需要生成项目目录结构配置
 */
const setPathConfig = ({ config = {}, parentDirName = '', parentDir, currentDir }) => {
  let currentDirPathTree = currentDir;
  let { nextBaseDir } = getNextDir(parentDir, currentDir);
  let { dirName } = getDirName(parentDirName, currentDir);
  currentDirPathTree.forEach(item => {
    let type = (item instanceof Array) ? 'Array' : ((typeof item === 'string') ? 'String' : '');
    if (type === 'String') {
      config[`${parentDirName}${firstCharacterUpper(item)}Dir`] = setDir(parentDir, item);
    } else if (type === 'Array') {
      setPathConfig({
        config,
        parentDirName: dirName,
        parentDir: nextBaseDir,
        currentDir: item
      });
    }
  });

  return config;
};

/**
 * 转换首字母为大写字符
 * @param {string} Str 需要转换的字符串
 */
const firstCharacterUpper = (Str = '') => {
  if (!Str || typeof Str !== 'string') {
    return '';
  }
  let splitNameArr = Str.split('');
  splitNameArr[0] = (splitNameArr[0]).toUpperCase();
  let upperName = splitNameArr.join('');
  return upperName;
};

/**
 * 设置当前路径
 * @param {string} parentDir 父文件夹路径
 * @param {string} currentDirName 当前文件夹名称
 */
const setDir = (parentDir, currentDirName) => {
  return path.resolve(parentDir, (currentDirName && typeof currentDirName === 'string') ? `./${currentDirName}` : '');
};

/**
 * 获取下一级文件夹树需要设置的父文件路径
 * @param {string} parentDir 父文件夹路径
 * @param {string} currentDir 当前文件夹树
 */
const getNextDir = (parentDir, currentDir) => {
  let nextBaseDir = parentDir;
  let isFatherChildrenMode = (currentDir.length === 2) && (typeof currentDir[0] === 'string') && (currentDir[1] instanceof Array);
  if (isFatherChildrenMode) {
    nextBaseDir = path.resolve(parentDir, `./${currentDir[0]}`);
  }
  return {
    nextBaseDir
  };
};

/**
 * 获取设置返回字段key
 * @param {string} parentDirName 父文件夹路径名字组合
 * @param {string} currentDir 当前文件夹树
 */
const getDirName = (parentDirName, currentDir) => {
  let dirName = parentDirName;
  let isFatherChildrenMode = (currentDir.length === 2) && (typeof currentDir[0] === 'string') && (currentDir[1] instanceof Array);
  if (isFatherChildrenMode) {
    dirName = `${parentDirName}${firstCharacterUpper(currentDir[0])}`;
  }
  return {
    dirName
  };
};


const BaseDir = path.resolve(__dirname, '../../');
const BuildDir = path.resolve(BaseDir, `./build`);

/**
 * 项目构建地址配置
 */
let buildPathConfig = setPathConfig({ config: {}, parentDirName: 'Build', parentDir: BuildDir, currentDir: pathTreeConfig[1] });

/**
 * 基础路径配置
 */
let basePatchConfig = setPathConfig({ config: {}, parentDir: BaseDir, currentDir: pathTreeConfig });


let config = {
  BaseDir,
  BuildDir,
  ...buildPathConfig,
  ...basePatchConfig
};

module.exports = config;
