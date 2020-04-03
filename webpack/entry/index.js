const path = require('path');
const {baseDir} = require('../config/direction')

let config = {
    /**
     * 入口文件
     * @type {Array[string]|Object|string}
     */
    entry: {
        main: path.resolve(baseDir, '../main.js')
    }
};

module.exports = config