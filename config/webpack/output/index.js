const path = require('path');
const buildBasePath = path.resolve('../../../', 'dist');

let config = {
    fileName: 'js/[name].[chunkhash].js',
    path: buildBasePath,
    publicPath: buildBasePath
};

export default {
    config,
    buildBasePath
};