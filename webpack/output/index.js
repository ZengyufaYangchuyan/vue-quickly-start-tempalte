const path = require('path');
const {assetJsDirName, buildAssetJsDir} = require('../config/direction');

let config = {
    /**
     * 出口文件
     * @type {Object|Array[string]|string}
     */
    output: {
        fileName: `[name].[chunkhash].js`,
        path: buildAssetJsDir,
        publicPath: `/${assetJsDirName}/`,
        vendor: []
    }
};

module.exports = config;