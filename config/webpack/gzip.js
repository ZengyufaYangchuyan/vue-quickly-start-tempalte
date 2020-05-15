const config = {
  /**
   * 包括所有通过测试的资源文件
   * @type {String|RegExp|Array<String|RegExp>}
   * @default undefined
   */
  test: /\.js$|\.css$|\.html$/,
  /**
   * 包括所有匹配这些条件的资源
   * @type {String|RegExp|Array<String|RegExp>}
   * @default undefined
   */
  include: undefined,
  /**
   * 排除所有符合这些条件的资源
   * @type {String|RegExp|Array<String|RegExp>}
   * @default undefined
   */
  exclude: undefined,
  /**
   * 压缩算法
   * @type {String|Function}
   * @default 'gzip'
   */
  algorithm: 'gzip',
  /**
   * 压缩配置
   * @type {Object}
   * @link https://nodejs.org/api/zlib.html#zlib_class_options
   * @default { level: 9 }
   */
  compressionOptions: {
    level: 9
  },
  /**
   * 只有资源大于这个值时，才会进行压缩，8192bytes === 8kb
   * @type {Number}
   * @default 0
   */
  threshold: 8192,
  /**
   * 最小压缩比率(minRatio =压缩大小/原始大小)
   * @type {Number}
   * @default 0.8
   */
  minRatio: 0.8,
  /**
   * 文件处理后的文件名称
   * @type {String|Function}
   * @default '[path].gz[query]'
   */
  filename: '[path].gz[query]',
  /**
   * 是否删除原始文件资源
   * @type {Boolean}
   * @default false
   */
  deleteOriginalAssets: false
};

module.exports = {
  /**
   * 是否开启Gizp压缩
   * @description 在开启gzip压缩，gizp配置在开启的时候，需要在nginx中配置相应的资源返回
   * @link http://nginx.org/en/docs/http/ngx_http_gzip_static_module.html
   * gzip on;
   * gzip_disable "msie6";
   * gzip_buffers 32 4k;
   * gzip_static on;
   */
  open: true,
  /**
   * gizp配置
   */
  config
};
