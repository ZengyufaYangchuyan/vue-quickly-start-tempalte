const path = require('path');
const {WebpackDir} = require('../config/direction')

let config = {
    /**
     * 入口文件
     * @type {Array[string]|Object|string}
     */
    entry: {
        main: path.resolve(WebpackDir, '../main.js')
    }
};

module.exports = config
