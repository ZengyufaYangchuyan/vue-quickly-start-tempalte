const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 是否为产品
 * @type {boolean}
 */
let isProduction = process.env.NODE_ENV === 'production';

/**
 * 规则配置
 * @type {Array}
 */
let baseRules = [
  {
    test: /\.(js|vue)$/,
    exclude: /node_modules|bower_components/,
    enforce: 'pre',
    loader: 'eslint-loader'
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  },
  // {
  //     test: /\.tsx?$/,
  //     loader: "ts-loader",
  //     options: { appendTsSuffixTo: [/\.vue$/] }
  // },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      /**
       * @type {Boolean}
       * @default false
       * @description 指定的目录将用来缓存 loader 的执行结果
       */
      cacheDirectory: true,
    }
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
    loader: 'url-loader',
    options: {
      /**
       * 是否开启esModule模式
       * @description file-loader在新版本中esModule默认为true，因此手动设置为false
       */
      esModule: false,
      /**
       * 在此限制以下将被打包为Data URL
       * @description 限制单位为byte
       */
      limit: 8192,
      name: `images/[name].[contenthash].[ext][query]`
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\..*)?$/i,
    loader: 'url-loader',
    options: {
      esModule: false,
      limit: 8192,
      name: `media/[name].[contenthash].[ext][query]`
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\..*)?$/g,
    loader: 'url-loader',
    options: {
      esModule: false,
      limit: 8192,
      name: `fonts/[name].[contenthash].[ext][query]`
    }
  }
];

/**
 * 设置样式加载规则
 */
const setAllCssRule = () => {
  /**
   * 在每项样式规则中的基础规则
   */
  let baseCssRules = [
    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        config: {
          path: './'
        }
      }
    }
  ];
  /**
   * 需要转换的
   */
  let allCssLoader = {
    css: {
      test: /\.css$/,
      use: []
    },
    stylus: {
      test: /\.styl(us)$/,
      use: [
        'stylus-loader'
      ]
    },
    sass: {
      test: /\.s(a|c)ss$/,
      use: [
        'sass-loader'
      ]
    },
    less: {
      test: /\.less$/,
      use: [
        'less-loader'
      ]
    }
  };
  /**
   * 组装后的样式规则
   */
  let packgageCssRules = [];
  let cssLoaderKeys = Object.keys(allCssLoader);
  cssLoaderKeys.forEach(item => {
    let { test, use = [] } = allCssLoader[`${item}`];
    packgageCssRules.push(
      {
        test,
        use: [
          ...baseCssRules,
          ...use
        ]
      }
    );
  });

  return packgageCssRules;
};

/**
 * 创建模块时，匹配请求的规则数组
 * @description 这些规则能够修改模块的创建方式。
 * 这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
 */
const rules = [
  ...baseRules,
  ...setAllCssRule()
];

module.exports = rules;
