const webpack = require('webpack');
const { basePath: path } = require('../output')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = [
    new CleanWebpackPlugin([path]),
    new HtmlWebpackPlugin()
];

export default config;