const webpack = require('webpack');
const { buildBasePath } = require('../output')
const { config: webConfig } = require('../../web/html')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = [
    new CleanWebpackPlugin([buildBasePath]),
    new HtmlWebpackPlugin(webConfig),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.MinChunkSizePlugin()
];

export default config;