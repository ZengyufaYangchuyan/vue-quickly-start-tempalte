let config = {
    /**
     * @description 哪些块需要拆分，所有还是异步导入的块
     * @type {String}
     * @example all/async
     */
    chunks: 'all',
    /**
     * @description 生成块最小尺寸大小（以bytes为单位）
     * @type {Number}
     * @example 30000
     */
    minSize: 30000,
    /**
     * @description 生成块最大尺寸大小（以bytes为单位），对于超过这个尺寸大小的文件会进行分割
     * @type {Number}
     * @example 500000
     */
    maxSize: 500000,
    /**
     * @description 允许同时最大异步加载文件的请求数量
     * @type {Number}
     * @example 5
     */
    maxAsyncRequests: 5,
    /**
     * @description 允许首页初始化加载文件的最大数量
     * @type {Number}
     * @example 3
     */
    maxInitialRequests: 3,
    /**
     * @description 分割后文件名字
     * @type {Boolean|String|Function}
     * @example true
     */
    name: true,
    /**
     * @description 为创建的块设置名称前缀
     * @type {String}
     * @example ''
     */
    automaticNamePrefix: '',
    /**
     * @description 缓存组可以继承和覆盖splitChunk中的任何选项，除了test，priority和reuseExistingChunk
     * @type {Object}
     * @example ''
     */
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        common: {
            priority: -20,
            /**
             * @description 如果当前块包含已经从主包中分离出来的模块，那么它将被重用，而不是生成一个新的块。
             */
            reuseExistingChunk: true
        }
    }
};

export default config;