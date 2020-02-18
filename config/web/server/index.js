const { buildBasePath } = require('../../webpack/output');
const path = require('path');

let config = {
    clientLogLevel: 'silent',
    compress: true,
    contentBase: buildBasePath,
    publicPath: path.resolve(buildBasePath, 'public'),
    /**
     * @description 是否自动打开浏览器
     */
    open: true,
     /**
      * @description 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      */
    overlay: {
        warnings: true,
        errors: true
    },
    host: '127.0.0.1',
    port: 8080,
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            pathRewrite: {'^/api' : ''}
        }
    }
};

export default config;