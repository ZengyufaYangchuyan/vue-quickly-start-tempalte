const path = require('path');
const basePath = 'dist'

let config = {
    fileName: '[name].[chunkhash].js',
    path: path.resolve(__dirname, `${basePath}/js`)
};

export default {
    config,
    basePath
};