const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {baseDir} = require('../config/direction')

/**
 * 规则配置
 */
let baseRules = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader'
    },
    {
        test: ,
        loader: 
    }
];

/**
 * 设置样式加载规则
 * @param {Boolean} isPorduction 是否为产品
 */
const setAllCssRule = (isPorduction) => {
    /**
     * 在每项样式规则中的基础规则
     */
    let baseCssRules = [
        isPorduction ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                path: baseDir
            }
        }
    ]
    /**
     * 需要转换的
     */
    let allCssLoader = {
        css: {
            test: /\.css$/,
            use: []
        },
        stylus: {
            test: /\.styl$/,
            use: [
                'stylus-loader'
            ]
        },
        sass: {
            test: /\.s(a|c)ss$/,
            use: [
                'sass-loader'
            ]
        },
        less: {
            test: /\.less$/,
            use: [
                'less-loader'
            ]
        }
    }
    /**
     * 组装后的样式规则
     */
    let packgageCssRules = []
    cssLoaderKeys = Object.keys(allCssLoader);
    cssLoaderKeys.forEach(item => {
        let {test, use = []} = allCssLoader[`${item}`]
        packgageCssRules.push(
            {
                test,
                use: [
                    ...baseCssRules,
                    ...use
                ]
            }
        )
    })

    return packgageCssRules
}

/**
 * 获取插件配置
 * @param {Boolean} isPorduction 是否为产品
 */
const getConfig = (isProduction) => {
    let rules = [
        ...baseRules,
        ...setAllCssRule(isProduction)
    ];
    return rules;
}

module.exports = getConfig;