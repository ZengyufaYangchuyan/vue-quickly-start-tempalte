const path = require('path');
const {BuildStaticDir} = require('../config/direction');

let config = {
    /**
     * 出口文件
     * @type {Object|Array[string]|string}
     */
    output: {
        filename: `js/[name].[contenthash].js`,
        path: BuildStaticDir,
        publicPath: ``
        // vendor: []
    }
};

module.exports = config;
