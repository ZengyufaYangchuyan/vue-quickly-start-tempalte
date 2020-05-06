const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 是否为产品
 * @type {boolean}
 */
let isProduction = process.env.NODE_ENV === 'production';

/**
 * 规则配置
 * @type {Array}
 */
let baseRules = [
    {
        test: /\.(js|vue)$/,
        exclude: /node_modules|bower_components/,
        enforce: 'pre',
        loader: 'eslint-loader'
    },
    {
        test: /\.vue$/,
        loader: 'vue-loader'
    },
    // {
    //     test: /\.tsx?$/,
    //     loader: "ts-loader",
    //     options: { appendTsSuffixTo: [/\.vue$/] }
    // },
    {
        test: /\.jsx?$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader'
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
            limit: 3072,
            name: `images/[name].[contenthash].[ext][query]`
        }
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\..*)?$/i,
        loader: 'url-loader',
        options: {
            limit: 3072,
            name: `media/[name].[contenthash].[ext][query]`
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\..*)?$/g,
        loader: 'url-loader',
        options: {
            limit: 3072,
            name: `fonts/[name].[contenthash].[ext][query]`
        }
    }
];

/**
 * 设置样式加载规则
 */
const setAllCssRule = () => {
    /**
     * 在每项样式规则中的基础规则
     */
    let baseCssRules = [
        isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        'css-loader',
        {
            loader: 'postcss-loader'
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
};

/**
 * 创建模块时，匹配请求的规则数组
 * @description 这些规则能够修改模块的创建方式。
 * 这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
 */
const rules = [
    ...baseRules,
    ...setAllCssRule()
];

module.exports = rules;
