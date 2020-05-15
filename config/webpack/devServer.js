const { SrcStaticDir } = require('./direction');

/**
 * 开发服务器
 */
const devServer = {
  /**
   * 指定使用一个 host
   * @description 默认是 localhost。如果你希望服务器外部可访问，可以设置成 0.0.0.0
   * @example 0.0.0.0
   */
  host: '0.0.0.0',
  /**
   * 指定要监听请求的端口号
   * @description 页面访问的端口号
   * @example 8080
   */
  port: 8080,
  /**
   * 是否在开启服务时在浏览器打开网址
   * @default false
   */
  open: false,
  /**
   * 前后端分离代理请求
   * @description 如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。
   */
  proxy: {
    '/api': {
      /**
       * 代理目标地址
       * @description 请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
       */
      target: 'http://localhost:3000',
      /**
       * 重写请求 API
       * @description 原请求 http://localhost:3000/api/users 将被改写成 http://localhost:3000/users
       */
      pathRewrite: {
        '^/api': ''
      },
      /**
       * 是否跨过浏览器安全协议
       * @description 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器
       * @default true
       * @type {boolean}
       */
      secure: false,
      /**
       *
       * @description 有时你不想代理所有的请求。
       * 可以基于一个函数的返回值绕过代理。
       * 必须返回 false 或路径，来跳过代理请求。
       * @return {boolean|string} false 或者路径
       */
      bypass: (req, res, proxyOptions) => {
        console.log(req, res, proxyOptions);
        if (req.headers.accept.indexOf("html") !== -1) {
          console.log("Skipping proxy for browser request.");
          return "/index.html";
        }
      }
    }
  },
  /**
   * 此选项允许您将允许访问dev服务器的服务列入白名单。
   * @type {Array}
   * @example ['host.com']
   */
  allowedHosts: [],
  /**
   * 是否启用gzip压缩
   * @type {boolean}
   */
  compress: true,
  /**
   * 告诉服务器从哪里提供内容
   * @description 只有在你想要提供静态文件时才需要。
   * 默认情况下，将使用当前工作目录作为提供内容的目录，推荐使用绝对路径。
   * @type {Array|boolean|string}
   */
  contentBase: SrcStaticDir,
  /**
   * 404 响应都可能需要被替代为指定的页面
   * @type {Array|boolean}
   */
  historyApiFallback: {
    rewirtes: [
      { from: /./, to: '/views/404.html' }
    ]
  }
};

module.exports = devServer;
